'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getFeaturedProducts } from '@/lib/api';
import type { Product } from '@/types';
import ProductCard from '@/components/product/ProductCard';
import Button from '@/components/ui/Button';
import LoadingState from '@/components/ui/LoadingState';

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getFeaturedProducts();
        setProducts(data);
      } catch (err) {
        console.error('Failed to load featured products:', err);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  return (
    <section className="py-16 lg:py-20 bg-cream/30" id="featured-products">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-sm font-medium text-accent uppercase tracking-wider mb-2">
              Handpicked for You
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-charcoal">
              Featured Products
            </h2>
          </div>
          <Link href="/products">
            <Button variant="ghost" size="sm" className="group">
              View All Products
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <LoadingState message="Loading featured products..." />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
