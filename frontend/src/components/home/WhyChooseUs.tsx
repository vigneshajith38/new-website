import {
  ShieldCheck,
  Layers,
  HeartHandshake,
  BadgePercent,
  Headphones,
} from 'lucide-react';

const features = [
  {
    icon: ShieldCheck,
    title: 'Quality Products',
    description:
      'Every product is carefully selected and quality-checked to meet the highest standards.',
  },
  {
    icon: Layers,
    title: 'Wide Product Range',
    description:
      'From cookware to pooja items — a comprehensive collection for every household need.',
  },
  {
    icon: HeartHandshake,
    title: 'Trusted Service',
    description:
      'Built on years of trust, serving families with dedication and reliability.',
  },
  {
    icon: BadgePercent,
    title: 'Competitive Pricing',
    description:
      'Premium quality at fair prices — because great kitchenware should be accessible.',
  },
  {
    icon: Headphones,
    title: 'Customer Support',
    description:
      'Dedicated support to help you find the right products and resolve any concerns.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 lg:py-20 bg-surface" id="why-choose-us">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-accent uppercase tracking-wider mb-2">
            Our Promise
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-charcoal">
            Why Choose Us
          </h2>
          <p className="text-text-muted mt-3 max-w-lg mx-auto">
            We bring together quality, variety, and trust to deliver the best
            kitchenware shopping experience.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="text-center p-6 rounded-xl border border-border hover:border-primary/15 hover:shadow-card transition-all duration-200 group"
              >
                <div className="w-12 h-12 rounded-xl bg-cream mx-auto mb-4 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-charcoal mb-2 text-sm">
                  {feature.title}
                </h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
