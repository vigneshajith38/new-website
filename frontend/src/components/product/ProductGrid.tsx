import type { Product } from '@/types';
import ProductCard from '@/components/product/ProductCard';

interface ProductGridProps {
  products: Product[];
  totalCount?: number;
}

export default function ProductGrid({ products, totalCount }: ProductGridProps) {
  return (
    <div>
      {totalCount !== undefined && (
        <p className="text-sm text-text-muted mb-4">
          Showing {products.length} of {totalCount} products
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
