'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductGalleryProps {
  images: { image: string; alt_text: string }[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // If no images, show placeholder
  if (images.length === 0) {
    return (
      <div className="aspect-square rounded-xl bg-border-light flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-text-muted/20 mx-auto mb-3" />
          <p className="text-sm text-text-muted/40">Product Image</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Main Image */}
      <div className="relative aspect-square rounded-xl bg-border-light overflow-hidden group flex items-center justify-center">
        <Image
          src={images[activeIndex].image}
          alt={images[activeIndex].alt_text || productName}
          fill
          className="object-contain p-2"
          sizes="(max-width: 768px) 100vw, 50vw"
          unoptimized={!images[activeIndex].image.startsWith('http://127.0.0.1') && !images[activeIndex].image.startsWith('http://localhost')}
        />

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={() =>
                setActiveIndex((prev) =>
                  prev === 0 ? images.length - 1 : prev - 1
                )
              }
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() =>
                setActiveIndex((prev) =>
                  prev === images.length - 1 ? 0 : prev + 1
                )
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-16 h-16 rounded-lg overflow-hidden border-2 shrink-0 transition-colors ${
                idx === activeIndex
                  ? 'border-primary'
                  : 'border-transparent hover:border-border'
              }`}
            >
              <div className="relative w-full h-full">
                <Image
                  src={img.image}
                  alt={img.alt_text || `${productName} thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="64px"
                  unoptimized={!img.image.startsWith('http://127.0.0.1') && !img.image.startsWith('http://localhost')}
                />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
