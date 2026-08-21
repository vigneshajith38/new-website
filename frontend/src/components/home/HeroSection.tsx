import Link from 'next/link';
import Button from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section 
      className="relative overflow-hidden bg-primary" 
      id="hero"
    >
      {/* Background Image & Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      <div className="container-custom relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-24 lg:py-32">
          {/* Content (Left) */}
          <div className="text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-cream text-xs font-medium mb-8 border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              Premium Quality Since Generations
            </div>

            <h1 
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#c49b63] leading-[1.1] mb-8 tracking-wide drop-shadow-md" 
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Excellence
            </h1>

            <p className="text-lg text-white/90 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed font-medium drop-shadow">
              Discover our curated collection of premium kitchenware, traditional
              cookware, and household essentials — built to last, designed to
              inspire.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Link href="/products">
                <Button variant="gold" size="lg" className="group px-8 shadow-lg shadow-gold/20">
                  Explore Catalogue
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/40 text-white hover:bg-white/20 px-8 backdrop-blur-sm"
                >
                  Contact Us
                </Button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center justify-center lg:justify-start">
              <div className="text-left">
                <p className="text-2xl font-bold text-white drop-shadow">1000+</p>
                <p className="text-sm text-white/80">Happy Customers</p>
              </div>
            </div>
          </div>

          {/* Right Side Empty Space to show background, plus bottom text */}
          <div className="hidden lg:flex items-end justify-end h-full w-full pb-8 pr-4">
            <div className="text-right z-10">
              <h3 className="text-3xl font-bold text-white/90 drop-shadow-lg mb-1 tracking-wider" style={{ fontFamily: 'Georgia, serif' }}>
                Artistry in Metal
              </h3>
              <p className="text-sm text-white/70 tracking-widest font-medium uppercase drop-shadow">
                Quality • Trust • Craftsmanship
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
