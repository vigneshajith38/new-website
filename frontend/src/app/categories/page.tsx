import type { Metadata } from 'next';
import { CATEGORIES } from '@/lib/config';
import CategoryCard from '@/components/ui/CategoryCard';
import Breadcrumb from '@/components/ui/Breadcrumb';

export const metadata: Metadata = {
  title: 'Categories',
  description:
    'Browse all product categories at Vignesh Metal Mart — Cookware, Household, Pooja Items, Cutlery, Dinnerware, Storage, Bathroom, Stoves & Appliances.',
};

export default function CategoriesPage() {
  return (
    <div className="container-custom py-2 pb-16">
      <Breadcrumb items={[{ label: 'Categories' }]} />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-charcoal mb-2">Categories</h1>
        <p className="text-text-muted">
          Explore our complete range of product categories.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {CATEGORIES.map((cat) => (
          <CategoryCard
            key={cat.slug}
            name={cat.name}
            slug={cat.slug}
            icon={cat.icon}
            variant="default"
          />
        ))}
      </div>
    </div>
  );
}
