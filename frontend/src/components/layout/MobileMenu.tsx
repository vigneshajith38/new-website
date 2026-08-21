'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  X,
  Heart,
  User,
  ShoppingBag,
  Phone,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { businessConfig } from '@/lib/config';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: { label: string; href: string }[];
}

export default function MobileMenu({ isOpen, onClose, navLinks }: MobileMenuProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity lg:hidden',
          isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-in Panel */}
      <div
        className={cn(
          'fixed top-0 right-0 z-50 h-full w-80 max-w-[85vw] bg-surface shadow-modal',
          'transform transition-transform duration-300 ease-in-out lg:hidden',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <span className="text-lg font-bold text-primary font-heading">Menu</span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-border-light transition-colors text-text-muted"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="px-3 py-4" aria-label="Mobile navigation">
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className={cn(
                    'block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                    pathname === link.href
                      ? 'text-primary bg-cream/50'
                      : 'text-text-secondary hover:text-primary hover:bg-cream/30'
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Divider */}
        <div className="mx-5 border-t border-border" />

        {/* Quick Actions */}
        <div className="px-3 py-4 space-y-1">
          <Link
            href="/wishlist"
            onClick={onClose}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-text-secondary hover:text-primary hover:bg-cream/30 transition-colors"
          >
            <Heart className="w-4 h-4" />
            Wishlist
          </Link>

          <Link
            href="/about"
            onClick={onClose}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-text-secondary hover:text-primary hover:bg-cream/30 transition-colors"
          >
            <User className="w-4 h-4" />
            Account
          </Link>
        </div>

        {/* Bottom Contact */}
        <div className="absolute bottom-0 left-0 right-0 px-5 py-4 border-t border-border bg-cream/30">
          <a
            href={`tel:${businessConfig.phone}`}
            className="flex items-center gap-2 text-sm text-primary font-medium"
          >
            <Phone className="w-4 h-4" />
            {businessConfig.phone}
          </a>
        </div>
      </div>
    </>
  );
}
