import os
import django
import sys

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from django.test import RequestFactory
from store.models import Product
from store.api.serializers import ProductSerializer

def test_serializer():
    factory = RequestFactory()
    request = factory.get('/api/products/')
    
    product = Product.objects.exclude(image='').first()
    if not product:
        return
        
    serializer = ProductSerializer(product, context={'request': request})
    print("Serialized Primary Image:")
    print(serializer.data.get('primary_image'))

if __name__ == '__main__':
    test_serializer()
