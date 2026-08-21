import os
import pandas as pd
from django.core.management.base import BaseCommand
from store.models import Product, Category
from django.utils.text import slugify
import math

class Command(BaseCommand):
    help = 'Import products from an Excel file'

    def add_arguments(self, parser):
        parser.add_argument('excel_path', type=str, help='Path to the Excel file')

    def handle(self, *args, **kwargs):
        excel_path = kwargs['excel_path']
        
        if not os.path.exists(excel_path):
            self.stderr.write(self.style.ERROR(f'File not found: {excel_path}'))
            return
            
        try:
            df = pd.read_excel(excel_path)
            self.stdout.write(f"Successfully loaded {len(df)} rows from {excel_path}")
        except Exception as e:
            self.stderr.write(self.style.ERROR(f'Error reading excel file: {e}'))
            return

        # Expected columns:
        # 'Item name*', 'Item code', 'Category', 'Sale price', 'Opening stock quantity'
        
        created_count = 0
        updated_count = 0
        error_count = 0
        seen_skus = {}

        for index, row in df.iterrows():
            try:
                name = str(row.get('Item name*', '')).strip()
                if not name or name.lower() == 'nan':
                    continue

                sku = str(row.get('Item code', '')).strip()
                if not sku or sku.lower() == 'nan':
                    # Generate a sku if missing
                    sku = f"SKU-{slugify(name)[:20]}"
                
                # Handle duplicate SKUs in the excel file
                if sku in seen_skus:
                    seen_skus[sku] += 1
                    sku = f"{sku}-{seen_skus[sku]}"
                else:
                    seen_skus[sku] = 0

                cat_name = str(row.get('Category', '')).strip()
                if not cat_name or cat_name.lower() == 'nan':
                    cat_name = 'Uncategorized'

                price_val = row.get('Sale price')
                price = None
                if pd.notna(price_val):
                    price = float(price_val)

                stock_val = row.get('Opening stock quantity')
                stock_quantity = 0
                if pd.notna(stock_val):
                    stock_quantity = max(0, int(stock_val))

                # Get or Create Category
                category, _ = Category.objects.get_or_create(
                    slug=slugify(cat_name),
                    defaults={'name': cat_name}
                )

                # Update or Create Product
                product, created = Product.objects.update_or_create(
                    sku=sku,
                    defaults={
                        'name': name,
                        'slug': f"{slugify(name)[:150]}-{slugify(sku)[:50]}",
                        'category': category,
                        'price': price,
                        'stock_quantity': stock_quantity,
                        'description': f"Premium {name}",
                        'active': True,
                    }
                )

                if created:
                    created_count += 1
                else:
                    updated_count += 1

            except Exception as e:
                self.stderr.write(self.style.ERROR(f"Error processing row {index}: {e}"))
                error_count += 1

        self.stdout.write(self.style.SUCCESS(
            f"Import complete! Created: {created_count}, Updated: {updated_count}, Errors: {error_count}"
        ))
