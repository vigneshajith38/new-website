import { businessConfig } from '@/lib/config';

export default function BrandSection() {
  return (
    <section className="py-16 lg:py-20 bg-cream/30" id="brand-section">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Visual */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center overflow-hidden">
              <div className="text-center p-8">
                <div className="w-20 h-20 rounded-2xl bg-primary mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl font-heading font-bold text-white">V</span>
                </div>
                <h3 className="text-2xl font-heading font-bold text-primary mb-2">
                  {businessConfig.name}
                </h3>
                <p className="text-sm text-text-muted">{businessConfig.tagline}</p>
              </div>
            </div>
            {/* Decorative accent */}
            <div className="absolute -bottom-3 -right-3 w-24 h-24 rounded-xl bg-gold/10 -z-10" />
          </div>

          {/* Content */}
          <div>
            <p className="text-sm font-medium text-accent uppercase tracking-wider mb-2">
              Our Story
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-charcoal mb-6">
              A Legacy of Quality{' '}
              <span className="text-primary">Craftsmanship</span>
            </h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                At {businessConfig.name}, we believe that every home deserves the
                finest kitchenware. What started as a humble metal and utensils
                store has grown into a trusted name for premium kitchen products.
              </p>
              <p>
                Our collection spans traditional brass and copper pooja items,
                heavy-gauge stainless steel cookware, elegant dinnerware sets,
                and modern kitchen appliances — all carefully selected to combine
                durability with everyday functionality.
              </p>
              <p>
                Every product we offer reflects our commitment to quality. We
                work directly with reputed manufacturers to ensure that our
                customers receive only the best, at prices that make premium
                kitchenware accessible to every household.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-surface border border-border text-center">
                <p className="text-2xl font-bold text-primary">500+</p>
                <p className="text-xs text-text-muted mt-1">Products</p>
              </div>
              <div className="p-4 rounded-xl bg-surface border border-border text-center">
                <p className="text-2xl font-bold text-primary">8+</p>
                <p className="text-xs text-text-muted mt-1">Categories</p>
              </div>
              <div className="p-4 rounded-xl bg-surface border border-border text-center">
                <p className="text-2xl font-bold text-primary">10+</p>
                <p className="text-xs text-text-muted mt-1">Years</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
