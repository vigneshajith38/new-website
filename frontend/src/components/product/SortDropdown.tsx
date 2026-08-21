'use client';

import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SortDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const sortOptions = [
  { label: 'Default', value: '' },
  { label: 'Name: A → Z', value: 'name_asc' },
  { label: 'Name: Z → A', value: 'name_desc' },
  { label: 'Price: Low → High', value: 'price_asc' },
  { label: 'Price: High → Low', value: 'price_desc' },
  { label: 'Newest First', value: 'newest' },
];

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <div className="relative">
      <label htmlFor="sort-select" className="sr-only">Sort products</label>
      <select
        id="sort-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          'appearance-none bg-surface border border-border rounded-lg',
          'pl-3 pr-9 py-2 text-sm text-text-secondary',
          'focus:border-primary focus:outline-none transition-colors',
          'cursor-pointer'
        )}
      >
        {sortOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
    </div>
  );
}
