'use client';

import { ShoppingBag } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';

export default function OrderSummary() {
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.getSubtotal());
  const deliveryCharge = useCartStore((s) => s.getDeliveryCharge());
  const total = useCartStore((s) => s.getTotal());

  return (
    <div className="rounded-xl border border-border bg-surface p-6">
      <h3 className="font-semibold text-charcoal mb-4">Your Order</h3>

      {/* Items */}
      <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
        {items.map((item) => (
          <div key={item.product.id} className="flex gap-3">
            <div className="w-12 h-12 rounded-lg bg-border-light flex items-center justify-center shrink-0">
              {item.product.primary_image ? (
                <img
                  src={item.product.primary_image}
                  alt={item.product.name}
                  className="w-full h-full object-contain rounded-lg"
                />
              ) : (
                <ShoppingBag className="w-4 h-4 text-text-muted/20" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-charcoal line-clamp-1">
                {item.product.name}
              </p>
              <p className="text-xs text-text-muted">
                Qty: {item.quantity} ×{' '}
                {formatPrice(item.product.sale_price ?? item.product.price ?? 0)}
              </p>
            </div>
            <p className="text-sm font-medium text-charcoal shrink-0">
              {formatPrice(
                (item.product.sale_price ?? item.product.price ?? 0) * item.quantity
              )}
            </p>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="border-t border-border pt-3 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-text-secondary">Subtotal</span>
          <span className="font-medium">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-secondary">Delivery</span>
          <span className="font-medium">
            {deliveryCharge === 0 ? (
              <span className="text-success">Free</span>
            ) : (
              formatPrice(deliveryCharge)
            )}
          </span>
        </div>
        <div className="border-t border-border pt-2 flex justify-between">
          <span className="font-semibold text-charcoal">Total</span>
          <span className="text-lg font-bold text-primary">
            {formatPrice(total)}
          </span>
        </div>
      </div>
    </div>
  );
}
