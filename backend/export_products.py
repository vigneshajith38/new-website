import os
import django
import pandas as pd
import sys

# Setup Django environment
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from store.models import Product, Category

def export_products():
    print("Fetching products from database...")
    products = Product.objects.select_related('category').all()
    
    data = []
    for p in products:
        data.append({
            'Product ID': p.id,
            'Product Name': p.name,
            'Current Category': p.category.name if p.category else '',
            'New Category Slug': '',  # You will fill this in
        })

    df = pd.DataFrame(data)
    
    # Save to the root of your workspace
    out_path = 'C:/Users/DELL/Documents/Works/shop/products_to_update.xlsx'
    df.to_excel(out_path, index=False)
    
    print(f"Successfully exported {len(products)} products to: {out_path}")
    print("\n--- Available Category Slugs you can use ---")
    categories = Category.objects.filter(active=True)
    for c in categories:
        print(f"Name: {c.name.ljust(30)} | Slug: {c.slug}")

if __name__ == '__main__':
    export_products()
