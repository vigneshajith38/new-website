'use client';

import { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
} from 'lucide-react';
import { businessConfig } from '@/lib/config';
import { getWhatsAppLink } from '@/lib/utils';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Button from '@/components/ui/Button';

export default function ContactPage() {
  const whatsappLink = getWhatsAppLink(
    businessConfig.whatsapp,
    'Hi, I have an enquiry.'
  );

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;

    const msg = [
      `Hi, I'm ${formData.name}.`,
      formData.phone ? `Phone: ${formData.phone}` : '',
      formData.email ? `Email: ${formData.email}` : '',
      '',
      formData.message,
    ]
      .filter(Boolean)
      .join('\n');

    const link = getWhatsAppLink(businessConfig.whatsapp, msg);
    window.open(link, '_blank');
    setSent(true);
  };

  return (
    <div className="container-custom py-2 pb-16">
      <Breadcrumb items={[{ label: 'Contact Us' }]} />

      <div className="mb-10">
        <h1 className="text-3xl font-bold text-charcoal mb-2">Contact Us</h1>
        <p className="text-text-muted">
          We&apos;re here to help. Reach out to us for any questions or support.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-bold text-charcoal mb-4">Get in Touch</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-surface border border-border">
                <Phone className="w-5 h-5 text-primary mb-3" />
                <h3 className="font-semibold text-charcoal text-sm mb-1">Phone</h3>
                <a
                  href={`tel:${businessConfig.phone}`}
                  className="text-sm text-text-secondary hover:text-primary transition-colors"
                >
                  {businessConfig.phone}
                </a>
              </div>
              <div className="p-5 rounded-xl bg-surface border border-border">
                <MessageCircle className="w-5 h-5 text-primary mb-3" />
                <h3 className="font-semibold text-charcoal text-sm mb-1">
                  WhatsApp
                </h3>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-secondary hover:text-primary transition-colors"
                >
                  Message us
                </a>
              </div>
              <div className="p-5 rounded-xl bg-surface border border-border sm:col-span-2">
                <Mail className="w-5 h-5 text-primary mb-3" />
                <h3 className="font-semibold text-charcoal text-sm mb-1">Email</h3>
                <a
                  href={`mailto:${businessConfig.email}`}
                  className="text-sm text-text-secondary hover:text-primary transition-colors"
                >
                  {businessConfig.email}
                </a>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-charcoal mb-4">Visit Us</h2>
            <div className="p-5 rounded-xl bg-surface border border-border space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div className="w-full">
                  <h3 className="font-semibold text-charcoal text-sm mb-1">
                    Store Location
                  </h3>
                  <p className="text-sm text-text-secondary mb-3">
                    {businessConfig.address}
                    <br />
                    {businessConfig.city}, {businessConfig.state} –{' '}
                    {businessConfig.pincode}
                  </p>
                  
                  {/* Embedded Google Map */}
                  <a 
                    href={businessConfig.googleMapsUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block w-full overflow-hidden rounded-lg border border-border group"
                  >
                    <div className="relative w-full h-48 bg-border-light flex items-center justify-center">
                      <iframe
                        src="https://maps.google.com/maps?q=Vignesh+Metal+Mart,+Kaniyapuram,+Kerala&t=&z=15&ie=UTF8&iwloc=&output=embed"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={false}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="opacity-90 group-hover:opacity-100 transition-opacity pointer-events-none"
                      ></iframe>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
                        <span className="bg-white px-3 py-1.5 rounded-full text-sm font-medium text-primary shadow-sm">
                          Open in Google Maps
                        </span>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              <div className="border-t border-border pt-4 mt-4 flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-charcoal text-sm mb-1">
                    Store Hours
                  </h3>
                  <div className="text-sm text-text-secondary space-y-0.5">
                    <p>Mon – Fri: {businessConfig.openingHours.weekdays}</p>
                    <p>Saturday: {businessConfig.openingHours.saturday}</p>
                    <p>Sunday: {businessConfig.openingHours.sunday}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form — sends via WhatsApp */}
        <div>
          <div className="rounded-xl border border-border bg-surface p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl font-bold text-charcoal mb-2">
              Send a Message
            </h2>
            <p className="text-sm text-text-muted mb-6">
              Fill out the form and we&apos;ll open WhatsApp with your message ready to send.
            </p>

            {sent ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <Send className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-charcoal mb-2">WhatsApp Opened!</h3>
                <p className="text-sm text-text-muted mb-4">
                  Your message has been prepared in WhatsApp. Just hit send!
                </p>
                <button
                  onClick={() => { setSent(false); setFormData({ name: '', phone: '', email: '', message: '' }); }}
                  className="text-sm text-primary hover:underline font-medium"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-sm font-medium text-charcoal mb-1.5"
                  >
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 text-sm rounded-lg border border-border focus:border-primary focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-sm font-medium text-charcoal mb-1.5"
                    >
                      Phone Number
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 text-sm rounded-lg border border-border focus:border-primary focus:outline-none transition-colors"
                      placeholder="Your phone"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-sm font-medium text-charcoal mb-1.5"
                    >
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 text-sm rounded-lg border border-border focus:border-primary focus:outline-none transition-colors"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-medium text-charcoal mb-1.5"
                  >
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 text-sm rounded-lg border border-border focus:border-primary focus:outline-none transition-colors min-h-[120px] resize-none"
                    placeholder="How can we help you?"
                  />
                </div>
                <Button type="submit" variant="primary" size="lg" fullWidth>
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Send via WhatsApp
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
