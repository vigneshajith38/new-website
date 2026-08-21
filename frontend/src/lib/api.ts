/**
 * Centralized API layer for Vignesh Metal Mart
 *
 * All fetch calls go through this module.
 * When NEXT_PUBLIC_API_URL is set, it hits the Django backend.
 * Otherwise, it falls back to mock data for development.
 */

import type {
  Product,
  Category,
  Order,
  CustomerInfo,
  CartItem,
  PaginatedResponse,
  ProductFilters,
} from '@/types';
import { mockProducts, mockCategories } from '@/lib/mockData';
import { generateOrderNumber } from '@/lib/utils';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const errorBody = await res.text().catch(() => '');
    throw new ApiError(res.status, res.statusText, errorBody);
  }

  return res.json() as Promise<T>;
}

export class ApiError extends Error {
  status: number;
  body: string;
  constructor(status: number, statusText: string, body: string) {
    super(`API Error ${status}: ${statusText}`);
    this.name = 'ApiError';
    this.status = status;
    this.body = body;
  }
}

// ---------------------------------------------------------------------------
// Use mock data when no backend URL is configured
// ---------------------------------------------------------------------------

function useMock(): boolean {
  return !API_URL;
}

// ---------------------------------------------------------------------------
// Products
// ---------------------------------------------------------------------------

export async function getProducts(
  filters?: Partial<ProductFilters>
): Promise<PaginatedResponse<Product>> {
  if (useMock()) {
    let filtered = [...mockProducts];

    if (filters?.search) {
      const q = filters.search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.category_name.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q)
      );
    }

    if (filters?.category) {
      filtered = filtered.filter((p) => p.category_slug === filters.category);
    }

    if (filters?.subcategory) {
      filtered = filtered.filter((p) => p.subcategory_slug === filters.subcategory);
    }

    if (filters?.sort) {
      switch (filters.sort) {
        case 'name_asc':
          filtered.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'name_desc':
          filtered.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case 'price_asc':
          filtered.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
          break;
        case 'price_desc':
          filtered.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
          break;
        case 'newest':
          filtered.sort(
            (a, b) =>
              new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
          break;
      }
    }

    const page = filters?.page || 1;
    const perPage = 12;
    const start = (page - 1) * perPage;
    const paged = filtered.slice(start, start + perPage);

    return {
      count: filtered.length,
      next: start + perPage < filtered.length ? `?page=${page + 1}` : null,
      previous: page > 1 ? `?page=${page - 1}` : null,
      results: paged,
    };
  }

  const params = new URLSearchParams();
  if (filters?.search) params.set('search', filters.search);
  if (filters?.category) params.set('category__slug', filters.category);
  if (filters?.subcategory) params.set('subcategory__slug', filters.subcategory);
  if (filters?.sort) params.set('ordering', filters.sort);
  if (filters?.page) params.set('page', String(filters.page));

  const qs = params.toString();
  return apiFetch<PaginatedResponse<Product>>(`/api/products/${qs ? `?${qs}` : ''}`);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  if (useMock()) {
    return mockProducts.filter((p) => p.is_featured);
  }
  const data = await apiFetch<PaginatedResponse<Product>>(
    '/api/products/?featured=true'
  );
  return data.results;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (useMock()) {
    return mockProducts.find((p) => p.slug === slug) ?? null;
  }
  try {
    return await apiFetch<Product>(`/api/products/${slug}/`);
  } catch {
    return null;
  }
}

export async function getRelatedProducts(
  categorySlug: string,
  excludeSlug: string
): Promise<Product[]> {
  if (useMock()) {
    return mockProducts
      .filter((p) => p.category_slug === categorySlug && p.slug !== excludeSlug)
      .slice(0, 4);
  }
  const data = await apiFetch<PaginatedResponse<Product>>(
    `/api/products/?category__slug=${categorySlug}&page_size=5`
  );
  return data.results.filter((p) => p.slug !== excludeSlug).slice(0, 4);
}

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------

export async function getCategories(): Promise<Category[]> {
  if (useMock()) {
    return mockCategories;
  }
  return apiFetch<Category[]>('/api/categories/');
}

export async function getCategoryBySlug(
  slug: string
): Promise<Category | null> {
  if (useMock()) {
    return mockCategories.find((c) => c.slug === slug) ?? null;
  }
  try {
    return await apiFetch<Category>(`/api/categories/${slug}/`);
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Orders
// ---------------------------------------------------------------------------

export async function createOrder(
  customer: CustomerInfo,
  items: CartItem[]
): Promise<Order> {
  if (useMock()) {
    // Simulate order creation
    const subtotal = items.reduce(
      (sum, item) => sum + (item.product.price ?? 0) * item.quantity,
      0
    );
    const deliveryCharge = subtotal > 500 ? 0 : 50;

    const order: Order = {
      id: Date.now(),
      order_number: generateOrderNumber(),
      customer_name: customer.name,
      customer_phone: customer.phone,
      customer_email: customer.email,
      delivery_address: customer.address,
      city: customer.city,
      state: customer.state,
      pincode: customer.pincode,
      notes: customer.notes,
      status: 'pending',
      subtotal,
      delivery_charge: deliveryCharge,
      total: subtotal + deliveryCharge,
      items: items.map((item, idx) => ({
        id: idx + 1,
        product: item.product.id,
        product_name: item.product.name,
        product_sku: item.product.sku,
        product_image: item.product.primary_image,
        quantity: item.quantity,
        unit_price: item.product.price ?? 0,
        total_price: (item.product.price ?? 0) * item.quantity,
      })),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    return order;
  }

  return apiFetch<Order>('/api/orders/', {
    method: 'POST',
    body: JSON.stringify({
      ...customer,
      items: items.map((item) => ({
        product: item.product.id,
        quantity: item.quantity,
      })),
    }),
  });
}

export async function getOrderByNumber(
  orderNumber: string
): Promise<Order | null> {
  if (useMock()) {
    return null;
  }
  try {
    return await apiFetch<Order>(`/api/orders/${orderNumber}/`);
  } catch {
    return null;
  }
}
