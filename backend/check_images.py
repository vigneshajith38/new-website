import os
import django
import sys

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from store.models import Product

def check_images():
    total = Product.objects.count()
    with_image = Product.objects.exclude(image='').count()
    with_image_url = Product.objects.exclude(image_url='').count()
    
    print(f"Total products: {total}")
    print(f"Products with 'image' field set: {with_image}")
    print(f"Products with 'image_url' field set: {with_image_url}")

if __name__ == '__main__':
    check_images()
