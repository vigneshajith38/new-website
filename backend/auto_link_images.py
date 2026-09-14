import os
import django
import sys
import difflib

# Setup Django environment
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from store.models import Product

def auto_link_images():
    media_dir = os.path.join('media', 'products')
    if not os.path.exists(media_dir):
        print("Media dir not found.")
        return

    # Get all product names from DB
    products = list(Product.objects.all())
    product_names = [p.name.lower() for p in products]
    product_dict = {p.name.lower(): p for p in products}

    cloudinary_base = "https://res.cloudinary.com/wlxqjvu9/image/upload/v1/media/products/"
    
    linked_count = 0

    for filename in os.listdir(media_dir):
        # Only process image files
        if not filename.lower().endswith(('.jpg', '.jpeg', '.png', '.webp', '.jfif', '.gif')):
            continue
            
        base_name = os.path.splitext(filename)[0]
        
        # 1. Clean up the filename to try and match it
        # E.g. "PRESTIGE__NON-STICK_FRY_PAN__28_CM" -> "prestige  non-stick fry pan  28 cm"
        clean_name = base_name.replace('_', ' ').lower().strip()
        clean_name = clean_name.replace('  ', ' ') # remove double spaces
        
        # 2. Try to find the closest matching product name in the database
        matches = difflib.get_close_matches(clean_name, product_names, n=1, cutoff=0.6)
        
        if matches:
            best_match = matches[0]
            product = product_dict[best_match]
            
            # The URL uploaded by the script didn't have an extension
            public_id = base_name
            url = f"{cloudinary_base}{public_id}"
            
            # Only update if they don't already have an image
            if not product.image and not product.image_url:
                product.image_url = url
                product.save()
                linked_count += 1
                print(f"Linked: {filename} \n   -> Product: {product.name}")
            else:
                print(f"Skipped: {product.name} already has an image.")
        else:
            print(f"No match found for: {filename}")

    print(f"\nFinished! Automatically linked {linked_count} images to products.")

if __name__ == '__main__':
    auto_link_images()
