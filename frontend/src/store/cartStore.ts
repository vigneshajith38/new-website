'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product, CartItem } from '@/types';

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, sizeVariantId?: number, sizeLabel?: string, priceOverride?: number) => void;
  removeItem: (productId: number, sizeVariantId?: number) => void;
  updateQuantity: (productId: number, sizeVariantId: number | undefined, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getSubtotal: () => number;
  getDeliveryCharge: () => number;
  getTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: Product, quantity = 1, sizeVariantId?: number, sizeLabel?: string, priceOverride?: number) => {
        set((state) => {
          const price = priceOverride ?? product.sale_price ?? product.price ?? 0;
          
          const existingIndex = state.items.findIndex(
            (item) => item.product.id === product.id && item.sizeVariantId === sizeVariantId
          );

          if (existingIndex >= 0) {
            const newItems = [...state.items];
            newItems[existingIndex].quantity += quantity;
            return { items: newItems };
          }
          
          return { 
            items: [...state.items, { 
              product, 
              quantity, 
              sizeVariantId, 
              sizeLabel, 
              priceAtAddition: price 
            }] 
          };
        });
      },

      removeItem: (productId: number, sizeVariantId?: number) => {
        set((state) => ({
          items: state.items.filter((item) => !(item.product.id === productId && item.sizeVariantId === sizeVariantId)),
        }));
      },

      updateQuantity: (productId: number, sizeVariantId: number | undefined, quantity: number) => {
        if (quantity < 1) return;
        set((state) => ({
          items: state.items.map((item) =>
            (item.product.id === productId && item.sizeVariantId === sizeVariantId) ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce(
          (sum, item) => sum + (item.priceAtAddition * item.quantity),
          0
        );
      },

      getDeliveryCharge: () => {
        const subtotal = get().getSubtotal();
        return subtotal > 500 ? 0 : 50;
      },

      getTotal: () => {
        return get().getSubtotal() + get().getDeliveryCharge();
      },
    }),
    {
      name: 'vmm-cart',
    }
  )
);
