'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, Eye, ShoppingBag } from 'lucide-react';
import type { Product } from '@/types';
import { formatPrice, cn, getWhatsAppLink } from '@/lib/utils';
import { businessConfig } from '@/lib/config';
import { useWishlistStore } from '@/store/wishlistStore';
import { useCartStore } from '@/store/cartStore';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);
  const isWishlisted = useWishlistStore((s) => s.isWishlisted(product.id));
  const addItem = useCartStore((s) => s.addItem);

  const hasPrice = product.price !== null;
  const hasSalePrice = product.sale_price !== null && product.sale_price < (product.price ?? Infinity);

  const whatsappLink = getWhatsAppLink(
    businessConfig.whatsapp,
    `Hi, I am interested in ${product.name}. Can you share more details?`
  );

  return (
    <div className="group flex flex-col h-full rounded-xl border border-border bg-surface overflow-hidden hover:border-primary/15 hover:shadow-card-hover transition-all duration-200">
      {/* Image */}
      <div className="relative aspect-square bg-border-light overflow-hidden flex items-center justify-center">
        {product.primary_image ? (
          <Image
            src={product.primary_image}
            alt={product.name}
            fill
            className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            unoptimized={!product.primary_image.startsWith('http://127.0.0.1') && !product.primary_image.startsWith('http://localhost')}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <ShoppingBag className="w-10 h-10 text-text-muted/30 mx-auto mb-2" />
              <p className="text-xs text-text-muted/40">{product.category_name}</p>
            </div>
          </div>
        )}

        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          className={cn(
            'absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all',
            isWishlisted
              ? 'bg-primary text-white shadow-sm'
              : 'bg-white/90 text-text-muted hover:text-primary shadow-sm'
          )}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className="w-4 h-4"
            fill={isWishlisted ? 'currentColor' : 'none'}
          />
        </button>

        {/* Sale Badge */}
        {hasSalePrice && (
          <div className="absolute top-3 left-3 px-2 py-0.5 rounded text-xs font-semibold bg-primary text-white">
            Sale
          </div>
        )}

        {/* Quick View Link */}
        <Link
          href={`/products/${product.slug}`}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-white rounded-lg shadow-sm text-xs font-medium text-primary hover:bg-cream transition-colors">
            <Eye className="w-3.5 h-3.5" />
            View Product
          </span>
        </Link>
      </div>

      {/* Details */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Category */}
        <p className="text-xs text-text-muted mb-1">{product.category_name}</p>

        {/* Name */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-charcoal text-sm leading-snug mb-1 group-hover:text-primary transition-colors line-clamp-2 h-10">
            {product.name}
          </h3>
        </Link>

        {/* Category */}

        {/* Price Hidden - Enquire via WhatsApp instead */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-muted font-medium italic">
            Price on Request
          </span>
        </div>
        
        {/* WhatsApp Enquiry Button */}
        <div className="mt-auto pt-3 border-t border-border">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full py-2.5 px-4 rounded-lg bg-primary text-white hover:bg-primary-light transition-colors text-sm font-semibold"
            onClick={(e) => e.stopPropagation()}
          >
            <span>Enquire via WhatsApp</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
