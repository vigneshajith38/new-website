import os
import django
import sys

# Setup Django environment
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from store.models import Product

def test_images():
    products = Product.objects.exclude(image='')[:5]
    if not products:
        print("No products with images found.")
        return
        
    for p in products:
        print(f"Product: {p.name}")
        print(f"Image name: {p.image.name}")
        try:
            print(f"Image URL: {p.image.url}")
        except Exception as e:
            print(f"Error getting URL: {e}")
        print("-" * 40)

if __name__ == '__main__':
    test_images()
