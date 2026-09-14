import os
import django
import pandas as pd
import sys

# Setup Django environment
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from store.models import Product, Category

def import_products():
    file_path = 'C:/Users/DELL/Documents/Works/shop/products_to_update.xlsx'
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        return

    print("Reading excel file...")
    df = pd.read_excel(file_path)
    
    updated_count = 0
    not_found_cats = set()

    for index, row in df.iterrows():
        product_id = row['Product ID']
        new_category_slug = str(row['New Category Slug']).strip()
        
        # Skip if they didn't fill in a new category
        if not new_category_slug or new_category_slug.lower() == 'nan':
            continue
            
        try:
            category = Category.objects.get(slug=new_category_slug)
            # Update the product
            Product.objects.filter(id=product_id).update(category=category)
            updated_count += 1
        except Category.DoesNotExist:
            not_found_cats.add(new_category_slug)
    
    print(f"\nSuccessfully updated {updated_count} products!")
    
    if not_found_cats:
        print("\nThe following category slugs were not found in the database and were skipped:")
        for cat in not_found_cats:
            print(f" - {cat}")

if __name__ == '__main__':
    import_products()
