'use client';

import { useEffect, useState, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import { getProducts } from '@/lib/api';
import type { Product } from '@/types';
import Breadcrumb from '@/components/ui/Breadcrumb';
import ProductGrid from '@/components/product/ProductGrid';
import FilterSidebar from '@/components/product/FilterSidebar';
import SortDropdown from '@/components/product/SortDropdown';
import SearchBar from '@/components/layout/SearchBar';
import LoadingState from '@/components/ui/LoadingState';
import EmptyState from '@/components/ui/EmptyState';
import ErrorState from '@/components/ui/ErrorState';
import Button from '@/components/ui/Button';

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const subcategory = searchParams.get('subcategory') || '';
  const sort = searchParams.get('sort') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);

  const totalPages = Math.ceil(totalCount / 12);

  const updateParams = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });
      // Reset to page 1 when filters change
      if (!('page' in updates)) {
        params.delete('page');
      }
      router.push(`/products?${params.toString()}`, { scroll: false });
    },
    [searchParams, router]
  );

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getProducts({ search, category, subcategory, sort, page });
        setProducts(data.results);
        setTotalCount(data.count);
      } catch (err) {
        console.error('Failed to load products:', err);
        setError('Failed to load products. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [search, category, subcategory, sort, page]);

  function handleReset() {
    router.push('/products');
  }

  return (
    <div className="container-custom py-2 pb-16">
      <Breadcrumb items={[{ label: 'Products' }]} />

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-charcoal mb-2">Products</h1>
        <p className="text-text-muted">
          Explore our complete range of premium kitchenware and household products.
        </p>
      </div>

      {/* Search + Sort Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
        <div className="flex-1">
          <SearchBar defaultValue={search} />
        </div>
        <div className="flex items-center gap-2">
          <SortDropdown
            value={sort}
            onChange={(val) => updateParams({ sort: val })}
          />
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setIsFilterOpen(true)}
            className="lg:hidden p-2.5 rounded-lg border border-border text-text-secondary hover:border-primary hover:text-primary transition-colors"
            aria-label="Open filters"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Active Filters */}
      {(category || subcategory || search) && (
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-xs text-text-muted">Active:</span>
          {search && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-cream text-primary text-xs font-medium">
              &ldquo;{search}&rdquo;
              <button onClick={() => updateParams({ search: '' })} className="hover:text-primary-light">×</button>
            </span>
          )}
          {category && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-cream text-primary text-xs font-medium">
              {category}
              <button onClick={() => updateParams({ category: '', subcategory: '' })} className="hover:text-primary-light">×</button>
            </span>
          )}
          {subcategory && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-cream text-primary text-xs font-medium">
              {subcategory}
              <button onClick={() => updateParams({ subcategory: '' })} className="hover:text-primary-light">×</button>
            </span>
          )}
          <button
            onClick={handleReset}
            className="text-xs text-primary hover:text-primary-light font-medium"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="flex gap-8">
        {/* Sidebar */}
        <FilterSidebar
          selectedCategory={category}
          selectedSubcategory={subcategory}
          onCategoryChange={(val) => updateParams({ category: val, subcategory: '' })}
          onSubcategoryChange={(val) => updateParams({ subcategory: val })}
          onReset={handleReset}
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
        />

        {/* Products */}
        <div className="flex-1 min-w-0">
          {isLoading ? (
            <LoadingState message="Loading products..." />
          ) : error ? (
            <ErrorState message={error} onRetry={() => window.location.reload()} />
          ) : products.length === 0 ? (
            <EmptyState
              title="No products found"
              description="Try adjusting your search or filters to find what you're looking for."
              actionLabel="Clear Filters"
              actionHref="/products"
            />
          ) : (
            <>
              <ProductGrid products={products} totalCount={totalCount} />

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page <= 1}
                    onClick={() => updateParams({ page: String(page - 1) })}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>

                  <div className="flex items-center gap-1 mx-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (p) => (
                        <button
                          key={p}
                          onClick={() => updateParams({ page: String(p) })}
                          className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                            p === page
                              ? 'bg-primary text-white'
                              : 'text-text-secondary hover:bg-border-light'
                          }`}
                        >
                          {p}
                        </button>
                      )
                    )}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page >= totalPages}
                    onClick={() => updateParams({ page: String(page + 1) })}
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="container-custom py-16"><LoadingState /></div>}>
      <ProductsContent />
    </Suspense>
  );
}
