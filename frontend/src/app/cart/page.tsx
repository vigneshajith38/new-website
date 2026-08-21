'use client';

import Link from 'next/link';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import Breadcrumb from '@/components/ui/Breadcrumb';
import CartItemComponent from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import EmptyState from '@/components/ui/EmptyState';
import Button from '@/components/ui/Button';
import type { Metadata } from 'next';

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const itemCount = useCartStore((s) => s.getItemCount());

  return (
    <div className="container-custom py-2 pb-16">
      <Breadcrumb items={[{ label: 'Shopping Cart' }]} />

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-charcoal">Shopping Cart</h1>
          <p className="text-text-muted text-sm mt-1">
            {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>
        {items.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearCart} className="text-error hover:text-error">
            <Trash2 className="w-4 h-4" />
            Clear Cart
          </Button>
        )}
      </div>

      {items.length === 0 ? (
        <EmptyState
          title="Your cart is empty"
          description="Looks like you haven't added any products yet. Explore our collection to find something you love."
          actionLabel="Explore Products"
          actionHref="/products"
        />
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-border bg-surface px-5">
              {items.map((item) => (
                <CartItemComponent key={item.product.id} item={item} />
              ))}
            </div>

            <Link href="/products" className="inline-flex mt-4">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4" />
                Continue Shopping
              </Button>
            </Link>
          </div>

          {/* Summary */}
          <div>
            <CartSummary />
          </div>
        </div>
      )}
    </div>
  );
}
