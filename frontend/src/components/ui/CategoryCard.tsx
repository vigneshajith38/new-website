import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  ChefHat,
  Home,
  Flame,
  UtensilsCrossed,
  Wine,
  Package,
  Bath,
  Zap,
  Star,
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  ChefHat,
  Home,
  Flame,
  UtensilsCrossed,
  Wine,
  Package,
  Bath,
  Zap,
  Star,
};

interface CategoryCardProps {
  name: string;
  slug: string;
  icon: string;
  description?: string;
  productCount?: number;
  variant?: 'default' | 'compact';
}

export default function CategoryCard({
  name,
  slug,
  icon,
  description,
  productCount,
  variant = 'default',
}: CategoryCardProps) {
  const Icon = iconMap[icon] || Package;
  const href = slug === 'super-myna-products' ? '/supermyna' : `/products?category=${slug}`;

  if (variant === 'compact') {
    return (
      <Link
        href={href}
        className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-cream/50 transition-colors group"
      >
        <div className="w-12 h-12 rounded-full bg-cream flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
          <Icon className="w-5 h-5" />
        </div>
        <span className="text-sm font-medium text-charcoal text-center">
          {name}
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        'group block rounded-xl border border-border bg-surface p-6',
        'hover:border-primary/20 hover:shadow-card-hover',
        'transition-all duration-200'
      )}
    >
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-xl bg-cream flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
          <Icon className="w-6 h-6" />
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-charcoal group-hover:text-primary transition-colors">
            {name}
          </h3>
          {description && (
            <p className="text-sm text-text-muted mt-1 line-clamp-2">
              {description}
            </p>
          )}
          {productCount !== undefined && (
            <p className="text-xs text-text-muted mt-2">
              {productCount} {productCount === 1 ? 'product' : 'products'}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
