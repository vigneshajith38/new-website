'use client';

import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import type { CartItem as CartItemType } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  const { product, quantity } = item;
  const unitPrice = product.sale_price ?? product.price ?? 0;
  const lineTotal = unitPrice * quantity;

  return (
    <div className="flex gap-4 py-5 border-b border-border last:border-b-0">
      {/* Image */}
      <Link href={`/products/${product.slug}`} className="shrink-0">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg bg-border-light flex items-center justify-center">
          {product.primary_image ? (
            <img
              src={product.primary_image}
              alt={product.name}
              className="w-full h-full object-contain rounded-lg"
            />
          ) : (
            <ShoppingBag className="w-8 h-8 text-text-muted/20" />
          )}
        </div>
      </Link>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <Link
              href={`/products/${product.slug}`}
              className="text-sm font-semibold text-charcoal hover:text-primary transition-colors line-clamp-2"
            >
              {product.name}
            </Link>
            <p className="text-xs text-text-muted mt-0.5">
              SKU: {product.sku}
            </p>
          </div>
          <button
            onClick={() => removeItem(product.id)}
            className="p-1.5 rounded-lg text-text-muted hover:text-error hover:bg-red-50 transition-colors shrink-0"
            aria-label={`Remove ${product.name} from cart`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-end justify-between mt-3">
          {/* Quantity Controls */}
          <div className="flex items-center border border-border rounded-lg">
            <button
              onClick={() => updateQuantity(product.id, quantity - 1)}
              disabled={quantity <= 1}
              className="p-1.5 text-text-muted hover:text-charcoal transition-colors disabled:opacity-30"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 text-center text-sm font-medium">
              {quantity}
            </span>
            <button
              onClick={() => updateQuantity(product.id, quantity + 1)}
              className="p-1.5 text-text-muted hover:text-charcoal transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Price */}
          <div className="text-right">
            <p className="text-sm font-bold text-primary">
              {formatPrice(lineTotal)}
            </p>
            {quantity > 1 && (
              <p className="text-xs text-text-muted">
                {formatPrice(unitPrice)} each
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
