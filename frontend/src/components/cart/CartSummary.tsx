'use client';

import Link from 'next/link';
import { Truck } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';
import Button from '@/components/ui/Button';

interface CartSummaryProps {
  showCheckoutButton?: boolean;
}

export default function CartSummary({ showCheckoutButton = true }: CartSummaryProps) {
  const subtotal = useCartStore((s) => s.getSubtotal());
  const deliveryCharge = useCartStore((s) => s.getDeliveryCharge());
  const total = useCartStore((s) => s.getTotal());

  const freeDeliveryThreshold = 500;
  const remainingForFreeDelivery = freeDeliveryThreshold - subtotal;

  return (
    <div className="rounded-xl border border-border bg-surface p-6">
      <h3 className="font-semibold text-charcoal mb-4">Order Summary</h3>

      <div className="space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-text-secondary">Subtotal</span>
          <span className="font-medium text-charcoal">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-text-secondary">Delivery</span>
          <span className="font-medium text-charcoal">
            {deliveryCharge === 0 ? (
              <span className="text-success">Free</span>
            ) : (
              formatPrice(deliveryCharge)
            )}
          </span>
        </div>
        <div className="border-t border-border pt-3 flex items-center justify-between">
          <span className="font-semibold text-charcoal">Total</span>
          <span className="text-lg font-bold text-primary">
            {formatPrice(total)}
          </span>
        </div>
      </div>

      {/* Free Delivery Banner */}
      {remainingForFreeDelivery > 0 && subtotal > 0 && (
        <div className="mt-4 p-3 rounded-lg bg-cream/50 border border-primary/5">
          <div className="flex items-center gap-2 text-xs text-primary">
            <Truck className="w-3.5 h-3.5" />
            <span>
              Add {formatPrice(remainingForFreeDelivery)} more for free delivery!
            </span>
          </div>
        </div>
      )}

      {showCheckoutButton && subtotal > 0 && (
        <Link href="/checkout" className="block mt-5">
          <Button variant="primary" fullWidth size="lg">
            Proceed to Checkout
          </Button>
        </Link>
      )}
    </div>
  );
}
