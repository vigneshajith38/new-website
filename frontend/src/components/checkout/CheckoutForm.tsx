'use client';

import { useState } from 'react';
import type { CustomerInfo } from '@/types';

interface CheckoutFormProps {
  onSubmit: (data: CustomerInfo) => void;
  isSubmitting: boolean;
}

const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
];

export default function CheckoutForm({ onSubmit, isSubmitting }: CheckoutFormProps) {
  const [formData, setFormData] = useState<CustomerInfo>({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CustomerInfo, string>>>({});

  function validate(): boolean {
    const newErrors: typeof errors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\s/g, '')))
      newErrors.phone = 'Enter a valid 10-digit phone number';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Enter a valid email address';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'PIN code is required';
    else if (!/^\d{6}$/.test(formData.pincode))
      newErrors.pincode = 'Enter a valid 6-digit PIN code';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  }

  function handleChange(field: keyof CustomerInfo, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  const inputClass = (field: keyof CustomerInfo) =>
    `w-full px-4 py-2.5 text-sm rounded-lg border transition-colors focus:outline-none ${
      errors[field]
        ? 'border-error focus:border-error bg-red-50/30'
        : 'border-border focus:border-primary bg-surface'
    }`;

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <h3 className="font-semibold text-charcoal text-lg">Delivery Details</h3>

      {/* Name */}
      <div>
        <label htmlFor="checkout-name" className="block text-sm font-medium text-charcoal mb-1.5">
          Full Name *
        </label>
        <input
          id="checkout-name"
          type="text"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className={inputClass('name')}
          placeholder="Enter your full name"
        />
        {errors.name && <p className="text-xs text-error mt-1">{errors.name}</p>}
      </div>

      {/* Phone + Email */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="checkout-phone" className="block text-sm font-medium text-charcoal mb-1.5">
            Phone Number *
          </label>
          <input
            id="checkout-phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className={inputClass('phone')}
            placeholder="10-digit mobile number"
          />
          {errors.phone && <p className="text-xs text-error mt-1">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="checkout-email" className="block text-sm font-medium text-charcoal mb-1.5">
            Email Address *
          </label>
          <input
            id="checkout-email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className={inputClass('email')}
            placeholder="your@email.com"
          />
          {errors.email && <p className="text-xs text-error mt-1">{errors.email}</p>}
        </div>
      </div>

      {/* Address */}
      <div>
        <label htmlFor="checkout-address" className="block text-sm font-medium text-charcoal mb-1.5">
          Delivery Address *
        </label>
        <textarea
          id="checkout-address"
          value={formData.address}
          onChange={(e) => handleChange('address', e.target.value)}
          className={`${inputClass('address')} min-h-[80px] resize-none`}
          placeholder="House/Flat number, Street, Area, Landmark"
          rows={3}
        />
        {errors.address && <p className="text-xs text-error mt-1">{errors.address}</p>}
      </div>

      {/* City + State + Pincode */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label htmlFor="checkout-city" className="block text-sm font-medium text-charcoal mb-1.5">
            City *
          </label>
          <input
            id="checkout-city"
            type="text"
            value={formData.city}
            onChange={(e) => handleChange('city', e.target.value)}
            className={inputClass('city')}
            placeholder="City"
          />
          {errors.city && <p className="text-xs text-error mt-1">{errors.city}</p>}
        </div>
        <div>
          <label htmlFor="checkout-state" className="block text-sm font-medium text-charcoal mb-1.5">
            State *
          </label>
          <select
            id="checkout-state"
            value={formData.state}
            onChange={(e) => handleChange('state', e.target.value)}
            className={`${inputClass('state')} appearance-none`}
          >
            <option value="">Select State</option>
            {indianStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          {errors.state && <p className="text-xs text-error mt-1">{errors.state}</p>}
        </div>
        <div>
          <label htmlFor="checkout-pincode" className="block text-sm font-medium text-charcoal mb-1.5">
            PIN Code *
          </label>
          <input
            id="checkout-pincode"
            type="text"
            value={formData.pincode}
            onChange={(e) => handleChange('pincode', e.target.value)}
            className={inputClass('pincode')}
            placeholder="6-digit PIN"
            maxLength={6}
          />
          {errors.pincode && <p className="text-xs text-error mt-1">{errors.pincode}</p>}
        </div>
      </div>

      {/* Notes */}
      <div>
        <label htmlFor="checkout-notes" className="block text-sm font-medium text-charcoal mb-1.5">
          Order Notes <span className="text-text-muted font-normal">(optional)</span>
        </label>
        <textarea
          id="checkout-notes"
          value={formData.notes}
          onChange={(e) => handleChange('notes', e.target.value)}
          className={`${inputClass('notes')} min-h-[60px] resize-none`}
          placeholder="Any special instructions for delivery..."
          rows={2}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 px-6 bg-primary text-white font-medium rounded-lg hover:bg-primary-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Placing Order...
          </>
        ) : (
          'Place Order'
        )}
      </button>

      <p className="text-xs text-text-muted text-center">
        Payment gateway will be integrated soon. Your order will be confirmed via phone/WhatsApp.
      </p>
    </form>
  );
}
