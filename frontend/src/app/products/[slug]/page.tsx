'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import {
  Heart,
  ShoppingBag,
  Minus,
  Plus,
  MessageCircle,
  Package,
  Ruler,
  Layers,
  Tag,
} from 'lucide-react';
import { getProductBySlug, getRelatedProducts } from '@/lib/api';
import type { Product } from '@/types';
import { formatPrice, getStockStatus, getWhatsAppLink, cn } from '@/lib/utils';
import { businessConfig } from '@/lib/config';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import Breadcrumb from '@/components/ui/Breadcrumb';
import ProductGallery from '@/components/product/ProductGallery';
import ProductCard from '@/components/product/ProductCard';
import Button from '@/components/ui/Button';
import LoadingState from '@/components/ui/LoadingState';
import ErrorState from '@/components/ui/ErrorState';

export default function ProductDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = params.slug as string;
  const initialSizeId = searchParams.get('size');

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariantId, setSelectedVariantId] = useState<number | null>(
    initialSizeId ? Number(initialSizeId) : null
  );

  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);
  const isWishlisted = useWishlistStore((s) =>
    product ? s.isWishlisted(product.id) : false
  );

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      try {
        const p = await getProductBySlug(slug);
        setProduct(p);
        if (p) {
          if (!selectedVariantId && p.related_sizes && p.related_sizes.length > 0) {
            setSelectedVariantId(p.related_sizes[0].id);
          }
          const related = await getRelatedProducts(p.category_slug, p.slug);
          setRelatedProducts(related);
        }
      } catch (err) {
        console.error('Failed to load product:', err);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="container-custom py-16">
        <LoadingState message="Loading product details..." />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-custom py-16">
        <ErrorState
          title="Product not found"
          message="The product you're looking for doesn't exist or has been removed."
        />
      </div>
    );
  }

  const selectedVariant = product.related_sizes?.find(v => v.id === selectedVariantId);
  const displayStock = selectedVariant ? selectedVariant.stock_quantity : product.stock_quantity;
  const displaySize = selectedVariant ? selectedVariant.size_label : product.size;
  const displayIsInStock = displayStock > 0;
  
  const stock = getStockStatus(displayStock);
  const hasPrice = product.price !== null;
  const hasSalePrice =
    product.sale_price !== null &&
    product.sale_price < (product.price ?? Infinity);

  const whatsappMessage = `Hi, I'm interested in ${product.name}${selectedVariant ? ` (${selectedVariant.size_label})` : ''}. Can you share more details?`;
  const whatsappLink = getWhatsAppLink(businessConfig.whatsapp, whatsappMessage);

  return (
    <div className="container-custom py-2 pb-16">
      <Breadcrumb
        items={[
          { label: 'Products', href: '/products' },
          {
            label: product.category_name,
            href: `/products?category=${product.category_slug}`,
          },
          { label: product.name },
        ]}
      />

      {/* Product Detail */}
      <div className="grid lg:grid-cols-2 gap-10 mt-4">
        {/* Gallery */}
        <ProductGallery 
          images={[
            ...(product.primary_image 
              ? [{ image: product.primary_image, alt_text: product.name }] 
              : []),
            ...product.images,
          ]} 
          productName={product.name} 
        />

        {/* Info */}
        <div>
          {/* Category */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-medium text-accent uppercase tracking-wider">
              {product.category_name}
            </span>
            {product.subcategory_name && (
              <>
                <span className="text-border">•</span>
                <span className="text-xs text-text-muted">
                  {product.subcategory_name}
                </span>
              </>
            )}
          </div>

          {/* Name */}
          <h1 className="text-2xl lg:text-3xl font-bold text-charcoal mb-2">
            {product.name}
          </h1>

          {/* Category */}

          {/* Price Hidden */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cream text-primary text-sm font-medium">
              <Tag className="w-4 h-4" />
              Price on Request
            </div>
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2 mb-6">
            <span
              className={cn(
                'inline-flex items-center gap-1.5 text-sm font-medium',
                stock.color
              )}
            >
              <span
                className={cn(
                  'w-2 h-2 rounded-full',
                  displayIsInStock ? 'bg-emerald-500' : 'bg-red-500'
                )}
              />
              {stock.label}
            </span>
            {displayStock > 0 && displayStock <= 10 && (
              <span className="text-xs text-text-muted">
                ({displayStock} left)
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-text-secondary leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Specs */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {product.material && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-border-light">
                <Layers className="w-4 h-4 text-text-muted" />
                <div>
                  <p className="text-xs text-text-muted">Material</p>
                  <p className="text-sm font-medium text-charcoal">
                    {product.material}
                  </p>
                </div>
              </div>
            )}
            {displaySize && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-border-light">
                <Ruler className="w-4 h-4 text-text-muted" />
                <div>
                  <p className="text-xs text-text-muted">Size / Capacity</p>
                  <p className="text-sm font-medium text-charcoal">
                    {displaySize}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Related Sizes */}
          {product.related_sizes && product.related_sizes.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-charcoal mb-3">Available Sizes</h3>
              <div className="flex flex-wrap gap-2">
                {product.related_sizes.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => setSelectedVariantId(size.id)}
                    className={cn(
                      "px-4 py-2 text-sm font-medium rounded-lg transition-colors border",
                      selectedVariantId === size.id
                        ? "border-primary text-primary bg-primary/5"
                        : "border-border text-text-muted hover:border-primary hover:text-primary"
                    )}
                  >
                    {size.size_label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-stretch gap-3 mb-6">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex-1">
              <div className="flex items-center justify-between w-full h-full py-3.5 px-6 rounded-lg bg-primary text-white hover:bg-primary-light transition-colors text-sm font-semibold">
                <span>Enquire via WhatsApp</span>
                <span>→</span>
              </div>
            </a>

            <Button
              variant={isWishlisted ? 'primary' : 'outline'}
              size="lg"
              onClick={() => toggleWishlist(product)}
              className="sm:w-auto w-full"
            >
              <Heart
                className="w-4 h-4"
                fill={isWishlisted ? 'currentColor' : 'none'}
              />
              {isWishlisted ? 'Wishlisted' : 'Wishlist'}
            </Button>
          </div>

          {/* Delivery Info */}
          <div className="p-4 rounded-xl bg-cream/50 border border-primary/5">
            <div className="flex items-center gap-2 text-sm text-primary font-medium mb-1">
              <Package className="w-4 h-4" />
              Delivery Information
            </div>
            <p className="text-xs text-text-muted">
              Free delivery on orders above ₹500. Standard delivery within 3-5
              business days. Contact us for bulk order delivery options.
            </p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-charcoal mb-6">
            Related Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
