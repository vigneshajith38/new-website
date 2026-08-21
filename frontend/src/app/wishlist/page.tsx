'use client';

import Link from 'next/link';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { useWishlistStore } from '@/store/wishlistStore';
import Breadcrumb from '@/components/ui/Breadcrumb';
import EmptyState from '@/components/ui/EmptyState';
import Button from '@/components/ui/Button';
import ProductCard from '@/components/product/ProductCard';

export default function WishlistPage() {
  const items = useWishlistStore((s) => s.items);
  const clearWishlist = useWishlistStore((s) => s.clearWishlist);
  const itemCount = items.length;

  return (
    <div className="container-custom py-2 pb-16">
      <Breadcrumb items={[{ label: 'Wishlist' }]} />

      <div className="flex items-center justify-between mb-8 mt-4">
        <div>
          <h1 className="text-3xl font-bold text-charcoal">My Wishlist</h1>
          <p className="text-text-muted text-sm mt-1">
            {itemCount} {itemCount === 1 ? 'item' : 'items'} saved
          </p>
        </div>
        {items.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearWishlist} className="text-error hover:text-error">
            <Trash2 className="w-4 h-4" />
            Clear Wishlist
          </Button>
        )}
      </div>

      {items.length === 0 ? (
        <EmptyState
          title="Your wishlist is empty"
          description="Save items you love here and check back later."
          actionLabel="Explore Products"
          actionHref="/products"
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
