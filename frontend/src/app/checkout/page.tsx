'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck } from 'lucide-react';
import { createOrder } from '@/lib/api';
import { useCartStore } from '@/store/cartStore';
import type { CustomerInfo } from '@/types';
import Breadcrumb from '@/components/ui/Breadcrumb';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import OrderSummary from '@/components/checkout/OrderSummary';
import EmptyState from '@/components/ui/EmptyState';

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(customerInfo: CustomerInfo) {
    setIsSubmitting(true);
    try {
      const order = await createOrder(customerInfo, items);
      clearCart();
      router.push(`/order-confirmation/${order.order_number}`);
    } catch (err) {
      console.error('Failed to create order:', err);
      alert('Failed to place your order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="container-custom py-16">
        <EmptyState
          title="Your cart is empty"
          description="Add some products to your cart before proceeding to checkout."
          actionLabel="Browse Products"
          actionHref="/products"
        />
      </div>
    );
  }

  return (
    <div className="container-custom py-2 pb-16">
      <Breadcrumb
        items={[
          { label: 'Cart', href: '/cart' },
          { label: 'Checkout' },
        ]}
      />

      <h1 className="text-3xl font-bold text-charcoal mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-border bg-surface p-6">
            <CheckoutForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
          </div>

          {/* Trust Badges */}
          <div className="mt-4 flex items-center gap-2 text-xs text-text-muted">
            <ShieldCheck className="w-4 h-4 text-success" />
            Your information is secure and will not be shared with third parties.
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="sticky top-24">
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
