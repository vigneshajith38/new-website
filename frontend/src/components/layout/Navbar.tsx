'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  Crown,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { businessConfig } from '@/lib/config';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import MobileMenu from '@/components/layout/MobileMenu';
import SearchBar from '@/components/layout/SearchBar';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Categories', href: '/categories' },
  { label: 'SuperMyna', href: '/supermyna' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const cartItemCount = useCartStore((s) => s.getItemCount());
  const wishlistCount = useWishlistStore((s) => s.getCount());

  useEffect(() => {
    setIsMounted(true);
    function handleScroll() {
      setIsScrolled(window.scrollY > 20);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary text-white/90 text-xs py-1.5 hidden sm:block">
        <div className="container-custom flex items-center justify-between">
          <span>Premium Kitchenware & Utensils — Quality You Can Trust</span>
          <div className="flex items-center gap-4">
            <a href={`tel:${businessConfig.phone}`} className="hover:text-white transition-colors">
              {businessConfig.phone}
            </a>
            <a href={`mailto:${businessConfig.email}`} className="hover:text-white transition-colors">
              {businessConfig.email}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={cn(
          'sticky top-0 z-40 bg-surface transition-shadow duration-200',
          isScrolled && 'shadow-nav'
        )}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-sm">V</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-lg font-bold text-primary font-heading tracking-tight">
                  {businessConfig.name}
                </span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                    pathname === link.href
                      ? 'text-primary bg-cream/50'
                      : 'text-text-secondary hover:text-primary hover:bg-cream/30'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-1">
              {/* Search Toggle */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 rounded-lg text-text-secondary hover:text-primary hover:bg-cream/30 transition-colors"
                aria-label="Search products"
                id="search-toggle"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="p-2 rounded-lg text-text-secondary hover:text-primary hover:bg-cream/30 transition-colors relative hidden sm:flex"
                aria-label="Wishlist"
                id="wishlist-link"
              >
                <Heart className="w-5 h-5" />
                {isMounted && wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* SuperMyna Brand */}
              <Link
                href="/supermyna"
                className="p-2 rounded-lg text-primary hover:text-primary-dark hover:bg-primary/10 transition-colors hidden sm:flex"
                aria-label="SuperMyna Brand"
                title="SuperMyna Brand"
              >
                <Crown className="w-5 h-5" />
              </Link>

              {/* Account */}
              <Link
                href="/about"
                className="p-2 rounded-lg text-text-secondary hover:text-primary hover:bg-cream/30 transition-colors hidden sm:flex"
                aria-label="Account"
                id="account-link"
              >
                <User className="w-5 h-5" />
              </Link>


              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 rounded-lg text-text-secondary hover:text-primary hover:bg-cream/30 transition-colors lg:hidden"
                aria-label="Open menu"
                id="mobile-menu-toggle"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar Dropdown */}
        {isSearchOpen && (
          <div className="border-t border-border bg-surface animate-slide-up">
            <div className="container-custom py-3">
              <SearchBar onClose={() => setIsSearchOpen(false)} />
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navLinks={navLinks}
      />
    </>
  );
}
