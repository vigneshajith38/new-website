import Link from 'next/link';
import Button from '@/components/ui/Button';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { businessConfig } from '@/lib/config';
import { getWhatsAppLink } from '@/lib/utils';

export default function CTASection() {
  const whatsappLink = getWhatsAppLink(
    businessConfig.whatsapp,
    'Hi, I am interested in your products. Can you help me?'
  );

  return (
    <section className="py-16 lg:py-20 bg-primary relative overflow-hidden" id="cta-section">
      {/* Decorative */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-gold/5 blur-3xl" />
      </div>

      <div className="container-custom relative text-center">
        <p className="text-sm font-medium text-accent uppercase tracking-wider mb-3">
          Ready to Shop?
        </p>
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 max-w-2xl mx-auto">
          Explore Our Complete Collection of Premium Kitchenware
        </h2>
        <p className="text-white/60 max-w-lg mx-auto mb-8">
          Browse through hundreds of quality products or get in touch with us for
          personalized recommendations and bulk orders.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/products">
            <Button variant="gold" size="lg" className="group">
              Browse Catalogue
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </Link>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <Button
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 hover:text-white"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Us
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
