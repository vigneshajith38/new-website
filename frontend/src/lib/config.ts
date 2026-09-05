import { BusinessConfig } from '@/types';

export const businessConfig: BusinessConfig = {
  name: 'Vignesh Metal Mart',
  tagline: 'Premium Kitchenware & Utensils',
  description:
    'Your trusted destination for premium kitchen utensils, cookware, household products, and more. Serving quality products with dedication and trust.',
  phone: '+91 95263 35057, 0471 2996976',
  whatsapp: '919526335057',
  email: 'contact@vigneshmetalmart.com',
  address: 'HVQ3+P8F, Chirayinkeezhu Kaniyapuram Rd, Kaniyapuram',
  city: 'Pallippuram',
  state: 'Kerala',
  pincode: '695301',
  googleMapsUrl: 'https://www.google.com/maps/dir//HVQ3%2BP8F+VIGNESH+METAL+MART,+Chirayinkeezhu+Kaniyapuram+Rd,+Kaniyapuram,+Pallippuram,+Kerala+695301/@8.5893077,76.853301,17z/data=!4m16!1m7!3m6!1s0x3b05bf95b5427d4d:0xb29b4432463d0ef2!2sVIGNESH+METAL+MART!8m2!3d8.5893077!4d76.853301!16s%2Fg%2F11vx5v4qn1!4m7!1m0!1m5!1m1!1s0x3b05bf95b5427d4d:0xb29b4432463d0ef2!2m2!1d76.8533047!2d8.5893089?hl=en-US&entry=ttu&g_ep=EgoyMDI2MDgxMi4wIKXMDSoASAFQAw%3D%3D',
  socialLinks: {
    facebook: 'https://facebook.com/vigneshmetalmart',
    instagram: 'https://instagram.com/vigneshmetalmart',
    youtube: 'https://youtube.com/@vigneshmetalmart',
  },
  openingHours: {
    weekdays: '9:00 AM – 8:00 PM',
    saturday: '9:00 AM – 8:00 PM',
    sunday: '9:00 AM – 8:00 PM',
  },
};

export const CATEGORIES = [
  { name: 'Super Myna Products', slug: 'super-myna-products', icon: 'Star' },
  { name: 'Cookware', slug: 'cookware', icon: 'ChefHat' },
  { name: 'Household', slug: 'household', icon: 'Home' },
  { name: 'Pooja Items', slug: 'pooja-items', icon: 'Flame' },
  { name: 'Cutlery', slug: 'cutlery', icon: 'UtensilsCrossed' },
  { name: 'Dinnerware', slug: 'dinnerware', icon: 'Wine' },
  { name: 'Storage', slug: 'storage', icon: 'Package' },
  { name: 'Stoves & Electronic Appliances', slug: 'stoves-electronic-appliances', icon: 'Zap' },
  { name: 'Pans & Grills', slug: 'pans-grills', icon: 'ChefHat' },
] as const;

export const ORDER_STATUSES: Record<string, { label: string; color: string }> = {
  pending: { label: 'Pending', color: '#F59E0B' },
  confirmed: { label: 'Confirmed', color: '#3B82F6' },
  processing: { label: 'Processing', color: '#8B5CF6' },
  shipped: { label: 'Shipped', color: '#06B6D4' },
  delivered: { label: 'Delivered', color: '#10B981' },
  cancelled: { label: 'Cancelled', color: '#EF4444' },
};
