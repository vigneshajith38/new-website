import os
import django
import sys
import re

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from store.models import Product

def fix_spelling():
    # Find all products containing variations of the misspelling
    products = Product.objects.filter(name__icontains='peigeon') | Product.objects.filter(name__icontains='peigion')
    
    count = 0
    for p in products:
        old_name = p.name
        
        # Replace exact uppercase matches first
        new_name = old_name.replace('PEIGION', 'PIGEON')
        new_name = new_name.replace('PEIGEON', 'PIGEON')
        
        # Replace Title case matches
        new_name = new_name.replace('Peigion', 'Pigeon')
        new_name = new_name.replace('Peigeon', 'Pigeon')
        
        # Replace lowercase matches
        new_name = new_name.replace('peigion', 'pigeon')
        new_name = new_name.replace('peigeon', 'pigeon')

        if old_name != new_name:
            p.name = new_name
            # Generate a new slug based on the new name
            from django.utils.text import slugify
            p.slug = slugify(new_name)
            p.save()
            count += 1
            print(f"Updated: '{old_name}' -> '{new_name}'")
        
    print(f"\nFixed spelling for {count} products!")

if __name__ == '__main__':
    fix_spelling()
