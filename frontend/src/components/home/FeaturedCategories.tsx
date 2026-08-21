import { CATEGORIES } from '@/lib/config';
import CategoryCard from '@/components/ui/CategoryCard';

export default function FeaturedCategories() {
  return (
    <section className="py-16 lg:py-20 bg-surface" id="featured-categories">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-accent uppercase tracking-wider mb-2">
            Browse by Category
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-charcoal">
            Shop Our Collections
          </h2>
          <p className="text-text-muted mt-3 max-w-lg mx-auto">
            From traditional cookware to modern kitchen appliances — find
            everything you need for your home.
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
    </section>
  );
}
