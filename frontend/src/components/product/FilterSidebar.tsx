'use client';

import { X, SlidersHorizontal } from 'lucide-react';
import { CATEGORIES } from '@/lib/config';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';

interface FilterSidebarProps {
  selectedCategory: string;
  selectedSubcategory: string;
  onCategoryChange: (category: string) => void;
  onSubcategoryChange: (subcategory: string) => void;
  onReset: () => void;
  isOpen: boolean;
  onClose: () => void;
}

// Subcategories for cookware
const cookwareSubcategories = [
  { name: 'Steel', slug: 'steel' },
  { name: 'Aluminium', slug: 'aluminium' },
  { name: 'Non-Stick', slug: 'non-stick' },
  { name: 'Cast Iron', slug: 'cast-iron' },
];

export default function FilterSidebar({
  selectedCategory,
  selectedSubcategory,
  onCategoryChange,
  onSubcategoryChange,
  onReset,
  isOpen,
  onClose,
}: FilterSidebarProps) {
  const hasActiveFilters = selectedCategory || selectedSubcategory;

  const sidebarContent = (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-primary" />
          <h3 className="font-semibold text-charcoal">Filters</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="text-xs text-primary hover:text-primary-light font-medium transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Categories */}
      <div>
        <h4 className="text-sm font-medium text-charcoal mb-3">Categories</h4>
        <div className="space-y-1">
          <button
            onClick={() => onCategoryChange('')}
            className={cn(
              'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
              !selectedCategory
                ? 'bg-cream text-primary font-medium'
                : 'text-text-secondary hover:bg-border-light'
            )}
          >
            All Categories
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => onCategoryChange(cat.slug)}
              className={cn(
                'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                selectedCategory === cat.slug
                  ? 'bg-cream text-primary font-medium'
                  : 'text-text-secondary hover:bg-border-light'
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Subcategories (show only for Cookware) */}
      {selectedCategory === 'cookware' && (
        <div>
          <h4 className="text-sm font-medium text-charcoal mb-3">
            Subcategories
          </h4>
          <div className="space-y-1">
            <button
              onClick={() => onSubcategoryChange('')}
              className={cn(
                'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                !selectedSubcategory
                  ? 'bg-cream text-primary font-medium'
                  : 'text-text-secondary hover:bg-border-light'
              )}
            >
              All Subcategories
            </button>
            {cookwareSubcategories.map((sub) => (
              <button
                key={sub.slug}
                onClick={() => onSubcategoryChange(sub.slug)}
                className={cn(
                  'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                  selectedSubcategory === sub.slug
                    ? 'bg-cream text-primary font-medium'
                    : 'text-text-secondary hover:bg-border-light'
                )}
              >
                {sub.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-24 p-5 rounded-xl border border-border bg-surface">
          {sidebarContent}
        </div>
      </aside>

      {/* Mobile Filter Drawer */}
      <div
        className={cn(
          'fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity lg:hidden',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />
      <div
        className={cn(
          'fixed bottom-0 left-0 right-0 z-50 bg-surface rounded-t-2xl shadow-modal p-6 max-h-[80vh] overflow-y-auto',
          'transform transition-transform duration-300 lg:hidden',
          isOpen ? 'translate-y-0' : 'translate-y-full'
        )}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-charcoal">Filters</h3>
          <button onClick={onClose} className="p-1 text-text-muted">
            <X className="w-5 h-5" />
          </button>
        </div>
        {sidebarContent}
        <div className="mt-6">
          <Button fullWidth variant="primary" onClick={onClose}>
            Apply Filters
          </Button>
        </div>
      </div>
    </>
  );
}
