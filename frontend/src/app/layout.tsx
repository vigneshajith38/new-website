import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Vignesh Metal Mart — Premium Kitchenware & Utensils',
    template: '%s | Vignesh Metal Mart',
  },
  description:
    'Shop premium kitchen utensils, cookware, household products, pooja items, cutlery, dinnerware, and more at Vignesh Metal Mart. Quality you can trust.',
  keywords: [
    'kitchenware',
    'utensils',
    'cookware',
    'stainless steel',
    'pooja items',
    'dinnerware',
    'cutlery',
    'household',
    'Indian kitchen',
    'Vignesh Metal Mart',
  ],
  openGraph: {
    title: 'Vignesh Metal Mart — Premium Kitchenware & Utensils',
    description:
      'Your trusted destination for premium kitchen utensils, cookware, and household products.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Vignesh Metal Mart',
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
