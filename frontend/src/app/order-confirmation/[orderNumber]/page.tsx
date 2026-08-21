'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { CheckCircle, ArrowRight, Phone } from 'lucide-react';
import { businessConfig } from '@/lib/config';
import Button from '@/components/ui/Button';

export default function OrderConfirmationPage() {
  const params = useParams();
  const orderNumber = params.orderNumber as string;

  return (
    <div className="container-custom py-16">
      <div className="max-w-lg mx-auto text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 rounded-full bg-success/10 mx-auto mb-6 flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-success" />
        </div>

        <h1 className="text-3xl font-bold text-charcoal mb-3">
          Order Placed Successfully!
        </h1>

        <p className="text-text-secondary mb-2">
          Thank you for your order. We&apos;ve received your request and will
          confirm it shortly.
        </p>

        {/* Order Number */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cream border border-primary/10 mb-6">
          <span className="text-sm text-text-muted">Order Number:</span>
          <span className="text-sm font-bold text-primary">{orderNumber}</span>
        </div>

        <div className="p-5 rounded-xl bg-border-light text-left mb-8 space-y-3">
          <h3 className="font-semibold text-charcoal text-sm">What happens next?</h3>
          <ul className="space-y-2 text-sm text-text-secondary">
            <li className="flex gap-2">
              <span className="w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center shrink-0 mt-0.5">
                1
              </span>
              <span>
                Our team will review your order and confirm it via phone or WhatsApp.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center shrink-0 mt-0.5">
                2
              </span>
              <span>
                Once confirmed, your order will be processed and prepared for delivery.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center shrink-0 mt-0.5">
                3
              </span>
              <span>
                Payment details and delivery updates will be shared with you directly.
              </span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/products">
            <Button variant="primary" size="lg" className="group">
              Continue Shopping
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </Link>
          <a href={`tel:${businessConfig.phone}`}>
            <Button variant="outline" size="lg">
              <Phone className="w-4 h-4" />
              Call Us
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
