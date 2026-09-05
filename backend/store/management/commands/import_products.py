import os
import pandas as pd
from django.core.management.base import BaseCommand
from store.models import Product, Category
from django.utils.text import slugify


class Command(BaseCommand):
    help = 'Import products from an Excel file (bulk insert for speed)'

    def add_arguments(self, parser):
        parser.add_argument('excel_path', type=str, help='Path to the Excel file')

    def handle(self, *args, **kwargs):
        excel_path = kwargs['excel_path']

        if not os.path.exists(excel_path):
            self.stderr.write(self.style.ERROR(f'File not found: {excel_path}'))
            return

        try:
            df = pd.read_excel(excel_path)
            self.stdout.write(f"Loaded {len(df)} rows from {excel_path}")
        except Exception as e:
            self.stderr.write(self.style.ERROR(f'Error reading excel file: {e}'))
            return

        # ── Step 1: Collect all unique category names and create them ──
        cat_names = set()
        for _, row in df.iterrows():
            cat = str(row.get('Category', '')).strip()
            cat_names.add(cat if cat and cat.lower() != 'nan' else 'Uncategorized')

        # get_or_create per category (only ~10 queries max)
        cat_map = {}  # slug -> Category instance
        for cat_name in cat_names:
            slug = slugify(cat_name)
            cat_obj, _ = Category.objects.get_or_create(slug=slug, defaults={'name': cat_name})
            cat_map[slug] = cat_obj
        self.stdout.write(f"Categories ready: {len(cat_map)}")

        # ── Step 2: Clear old products to avoid slug conflicts ──
        self.stdout.write("Clearing old products...")
        Product.objects.all().delete()

        # ── Step 3: Build all Product objects in memory ──
        products_to_create = []
        seen_slugs = {}
        error_count = 0

        for index, row in df.iterrows():
            try:
                name = str(row.get('Item name*', '')).strip()
                if not name or name.lower() == 'nan':
                    continue

                item_code = str(row.get('Item code', '')).strip()
                if not item_code or item_code.lower() == 'nan':
                    item_code = slugify(name)[:30]

                base_slug = f"{slugify(name)[:100]}-{slugify(item_code)[:50]}"
                slug = base_slug
                if slug in seen_slugs:
                    seen_slugs[slug] += 1
                    slug = f"{base_slug}-{seen_slugs[slug]}"
                else:
                    seen_slugs[slug] = 0

                cat_name = str(row.get('Category', '')).strip()
                if not cat_name or cat_name.lower() == 'nan':
                    cat_name = 'Uncategorized'
                category = cat_map[slugify(cat_name)]

                price_val = row.get('Sale price')
                price = float(price_val) if pd.notna(price_val) else None

                stock_val = row.get('Opening stock quantity')
                stock_quantity = max(0, int(stock_val)) if pd.notna(stock_val) else 0

                products_to_create.append(Product(
                    name=name,
                    slug=slug,
                    category=category,
                    price=price,
                    stock_quantity=stock_quantity,
                    description=f"Premium {name}",
                    active=True,
                ))
            except Exception as e:
                self.stderr.write(self.style.ERROR(f"Error on row {index}: {e}"))
                error_count += 1

        # ── Step 4: Single bulk insert (much faster over remote DB) ──
        self.stdout.write(f"Bulk inserting {len(products_to_create)} products...")
        Product.objects.bulk_create(products_to_create, batch_size=100)

        self.stdout.write(self.style.SUCCESS(
            f"Import complete! Created: {len(products_to_create)}, Errors: {error_count}"
        ))
