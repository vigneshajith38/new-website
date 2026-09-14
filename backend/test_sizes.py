import os
import django
import sys
import json

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from django.test import RequestFactory
from store.models import Product
from store.api.serializers import ProductSerializer

def test_related_sizes():
    factory = RequestFactory()
    request = factory.get('/api/products/')
    
    # Let's find one we know has sizes: PIGEON SS PRESURE COOKER 2 LTR
    product = Product.objects.filter(name__icontains='PIGEON SS PRESURE COOKER').first()
    if not product:
        print("Product not found")
        return
        
    print(f"Testing for: {product.name}")
    serializer = ProductSerializer(product, context={'request': request})
    sizes = serializer.data.get('related_sizes')
    
    print("Related Sizes:")
    print(json.dumps(sizes, indent=2))

if __name__ == '__main__':
    test_related_sizes()
