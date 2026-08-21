import type { Metadata } from 'next';
import { ShieldCheck, Award, Users, Sparkles } from 'lucide-react';
import { businessConfig } from '@/lib/config';
import Breadcrumb from '@/components/ui/Breadcrumb';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Vignesh Metal Mart — our story, values, and commitment to bringing you the finest kitchenware and household products.',
};

const values = [
  {
    icon: ShieldCheck,
    title: 'Quality First',
    description:
      'Every product we stock is quality-tested. We work directly with trusted manufacturers to ensure durability and craftsmanship.',
  },
  {
    icon: Award,
    title: 'Customer Trust',
    description:
      'We have built lasting relationships with our customers through honesty, reliability, and consistent service over the years.',
  },
  {
    icon: Users,
    title: 'Family Business',
    description:
      'As a family-run business, we understand the needs of Indian homes. We select products that families will use and love for years.',
  },
  {
    icon: Sparkles,
    title: 'Curated Selection',
    description:
      'We don\'t stock everything — we stock the right things. Each product is chosen to offer real value and lasting performance.',
  },
];

export default function AboutPage() {
  return (
    <div className="container-custom py-2 pb-16">
      <Breadcrumb items={[{ label: 'About Us' }]} />

      {/* Hero */}
      <div className="text-center py-12 lg:py-16">
        <p className="text-sm font-medium text-accent uppercase tracking-wider mb-3">
          About Us
        </p>
        <h1 className="text-3xl lg:text-5xl font-bold text-charcoal mb-4 max-w-2xl mx-auto">
          A Tradition of Quality,{' '}
          <span className="text-primary">Built for Modern Homes</span>
        </h1>
        <p className="text-text-secondary max-w-xl mx-auto leading-relaxed">
          {businessConfig.name} is a family-owned kitchenware and utensils business
          dedicated to bringing you premium products at honest prices.
        </p>
      </div>

      {/* Story */}
      <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
        <div className="aspect-[4/3] rounded-2xl bg-cream/50 border border-primary/5 flex items-center justify-center">
          <div className="text-center p-8">
            <div className="w-16 h-16 rounded-xl bg-primary mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl font-heading font-bold text-white">V</span>
            </div>
            <p className="text-lg font-heading font-semibold text-primary">
              {businessConfig.name}
            </p>
            <p className="text-sm text-text-muted mt-1">Est. Since Generations</p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-charcoal mb-4">Our Story</h2>
          <div className="space-y-4 text-text-secondary leading-relaxed">
            <p>
              What began as a small metal goods shop has grown into a trusted name
              for premium kitchenware in our community. {businessConfig.name} has been
              serving families with quality utensils, cookware, and household
              products for generations.
            </p>
            <p>
              We believe that the right kitchen tools make cooking a joy. From
              the heavy-gauge stainless steel pressure cooker to the traditional
              brass pooja thali, every product in our store tells a story of
              craftsmanship and utility.
            </p>
            <p>
              Today, we bring this legacy online — making our curated collection
              accessible to customers beyond our physical store while maintaining
              the personal service and quality standards our customers expect.
            </p>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-charcoal">Our Values</h2>
          <p className="text-text-muted mt-2">What drives everything we do.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <div
                key={value.title}
                className="p-6 rounded-xl border border-border hover:border-primary/15 hover:shadow-card transition-all text-center group"
              >
                <div className="w-12 h-12 rounded-xl bg-cream mx-auto mb-4 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-charcoal mb-2">{value.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats */}
      <div className="bg-primary rounded-2xl p-10 text-center">
        <h2 className="text-2xl font-bold text-white mb-8">By the Numbers</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <p className="text-3xl font-bold text-gold">500+</p>
            <p className="text-sm text-white/60 mt-1">Products</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-gold">8+</p>
            <p className="text-sm text-white/60 mt-1">Categories</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-gold">1000+</p>
            <p className="text-sm text-white/60 mt-1">Happy Customers</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-gold">10+</p>
            <p className="text-sm text-white/60 mt-1">Years of Service</p>
          </div>
        </div>
      </div>
    </div>
  );
}
