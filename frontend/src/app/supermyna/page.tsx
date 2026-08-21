import type { Metadata } from 'next';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'SuperMyna',
  description: 'Discover SuperMyna - Our exclusive in-house brand offering premium quality products.',
};

export default function SuperMynaPage() {
  return (
    <div className="container-custom py-4 pb-16">
      <Breadcrumb items={[{ label: 'SuperMyna' }]} />

      <div className="max-w-4xl mx-auto mt-8">
        {/* Hero Section */}
        <div className="bg-primary/5 rounded-3xl p-8 md:p-12 text-center mb-12 border border-primary/10">
          <div className="relative w-48 h-48 mx-auto mb-8 rounded-3xl overflow-hidden shadow-card">
            <Image 
              src="/images/supermyna-logo.jpg" 
              alt="SuperMyna Logo"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 192px, 192px"
              priority
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-4 font-heading">
            SuperMyna
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            At Vignesh Metal Mart, we believe the heart of every home deserves the absolute best. That is why we created SuperMyna.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-charcoal leading-tight">
              The SuperMyna Promise:<br/> Built on Trust, Designed for Today
            </h2>
            <p className="text-text-secondary leading-relaxed">
              SuperMyna is the culmination of our dedicated six-year journey. By listening closely to our customers, we recognized a clear demand for kitchenware that doesn't force you to choose between enduring strength and modern aesthetics. 
            </p>
            <p className="text-text-secondary leading-relaxed">
              We took everything we learned about quality kitchenware and poured it into our own signature line. Stronger. Smarter. Superior. Welcome to the new standard in home and kitchen essentials.
            </p>
          </div>
          <div className="bg-surface rounded-2xl p-8 border border-border shadow-sm">
            <h3 className="font-semibold text-lg text-charcoal mb-5">Why Choose SuperMyna?</h3>
            <div className="space-y-5">
              {[
                { 
                  title: 'Uncompromising Quality', 
                  desc: "Engineered with premium, food-grade materials for your family's safety and peace of mind."
                },
                { 
                  title: 'Customer-Driven Innovation', 
                  desc: 'Designed based on six years of real feedback from households just like yours.'
                },
                { 
                  title: 'Intelligent Design', 
                  desc: 'Featuring modern, ergonomic designs that look beautiful and feel effortless to use.'
                }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                  <div>
                    <span className="font-semibold text-charcoal block">{item.title}</span>
                    <span className="text-sm text-text-secondary">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Products Placeholder Section */}
        <div className="text-center bg-cream/30 rounded-3xl p-12 border border-border">
          <h2 className="text-2xl font-bold text-charcoal mb-3">Our Collection</h2>
          <p className="text-text-secondary mb-8 max-w-xl mx-auto">
            We are currently curating our exclusive catalog of SuperMyna products. The full collection will be available here soon!
          </p>
          <Link href="/products">
            <Button variant="primary" size="lg">
              Explore All Products Meanwhile
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
