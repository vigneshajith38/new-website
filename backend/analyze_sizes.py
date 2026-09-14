import os
import django
import sys
import re
from collections import defaultdict

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from store.models import Product

def analyze_sizes():
    products = Product.objects.all()
    groups = defaultdict(list)
    
    # Regex to find sizes at the end of product names (e.g. 2 LTR, 5L, 20 CM, 1 KG)
    size_pattern = re.compile(r'\s+((?:\d+(?:\.\d+)?\s*(?:LTR|L|CM|MM|KG|PCS|LITRE)S?)|(?:\d+x\d+\s*CM))$', re.IGNORECASE)
    
    for p in products:
        match = size_pattern.search(p.name)
        if match:
            base_name = p.name[:match.start()].strip()
            size = match.group(1).strip()
            groups[base_name].append((p.name, size))
        else:
            groups[p.name].append((p.name, "default"))
            
    # Print some examples of grouped products
    count = 0
    for base, items in groups.items():
        if len(items) > 1:
            print(f"Base: {base}")
            for name, size in items:
                print(f"  - Size: {size} | Original: {name}")
            print()
            count += 1
            if count >= 10:
                break

if __name__ == '__main__':
    analyze_sizes()
