// ============================================================
// Vignesh Metal Mart — TypeScript Type Definitions
// ============================================================

// --- Category ---
export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string | null;
  parent: number | null;
  parent_name: string | null;
  is_active: boolean;
  children?: Category[];
  product_count?: number;
  created_at: string;
  updated_at: string;
}

// --- Product Image ---
export interface ProductImage {
  id: number;
  image: string;
  alt_text: string;
  is_primary: boolean;
  sort_order: number;
}

// --- Product ---
export interface Product {
  id: number;
  name: string;
  slug: string;
  sku: string;
  description: string;
  category: number;
  category_name: string;
  category_slug: string;
  subcategory: number | null;
  subcategory_name: string | null;
  subcategory_slug: string | null;
  material: string;
  size: string;
  price: number | null;
  sale_price: number | null;
  stock_quantity: number;
  is_in_stock: boolean;
  primary_image: string | null;
  images: ProductImage[];
  is_active: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

// --- Cart ---
export interface CartItem {
  product: Product;
  quantity: number;
}

// --- Wishlist ---
export interface WishlistItem {
  productId: number;
  addedAt: string;
}

// --- Customer / Checkout ---
export interface CustomerInfo {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  notes: string;
}

// --- Order ---
export interface OrderItem {
  id: number;
  product: number;
  product_name: string;
  product_sku: string;
  product_image: string | null;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface Order {
  id: number;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  delivery_address: string;
  city: string;
  state: string;
  pincode: string;
  notes: string;
  status: OrderStatus;
  subtotal: number;
  delivery_charge: number;
  total: number;
  items: OrderItem[];
  created_at: string;
  updated_at: string;
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

// --- API Response ---
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// --- Filter State ---
export interface ProductFilters {
  search: string;
  category: string;
  subcategory: string;
  sort: string;
  page: number;
}

// --- Business Config ---
export interface BusinessConfig {
  name: string;
  tagline: string;
  description: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  googleMapsUrl: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    youtube: string;
  };
  openingHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
}
