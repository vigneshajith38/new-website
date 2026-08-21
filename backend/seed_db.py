import os
import django

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from store.models import Category, Product

def seed():
    print("Clearing existing data...")
    Product.objects.all().delete()
    Category.objects.all().delete()

    print("Creating Categories...")
    
    # Primary Categories
    cookware = Category.objects.create(name='Cookware', slug='cookware', description='Premium cooking vessels and pans for every kitchen need.')
    household = Category.objects.create(name='Household', slug='household', description='Essential household items for daily living.')
    pooja = Category.objects.create(name='Pooja Items', slug='pooja-items', description='Sacred brass and copper pooja items for worship.')
    cutlery = Category.objects.create(name='Cutlery', slug='cutlery', description='Quality cutlery sets and individual pieces.')
    dinnerware = Category.objects.create(name='Dinnerware', slug='dinnerware', description='Elegant plates, bowls, and serving sets.')
    storage = Category.objects.create(name='Storage', slug='storage', description='Airtight containers and kitchen storage solutions.')
    bathroom = Category.objects.create(name='Bathroom', slug='bathroom', description='Steel and brass bathroom accessories.')
    stoves = Category.objects.create(name='Stoves & Electronic Appliances', slug='stoves-electronic-appliances', description='Gas stoves, induction cooktops, and kitchen electronics.')

    # Subcategories
    steel = Category.objects.create(name='Steel', slug='steel', description='Stainless steel cookware', parent_category=cookware)
    aluminium = Category.objects.create(name='Aluminium', slug='aluminium', description='Lightweight aluminium cookware', parent_category=cookware)
    non_stick = Category.objects.create(name='Non-Stick', slug='non-stick', description='Non-stick coated cookware', parent_category=cookware)
    cast_iron = Category.objects.create(name='Cast Iron', slug='cast-iron', description='Heavy-duty cast iron cookware', parent_category=cookware)

    print("Creating Products...")
    
    products_data = [
        # Cookware - Steel
        {
            'name': 'Stainless Steel Pressure Cooker 5L', 'slug': 'stainless-steel-pressure-cooker-5l', 'sku': 'VMM-CK-001',
            'description': 'Heavy-gauge stainless steel pressure cooker with a precision weight valve and cool-touch handles.',
            'category': cookware, 'subcategory': steel, 'material': 'Stainless Steel', 'size': '5 Litres',
            'price': 2450.00, 'sale_price': None, 'stock_quantity': 25, 'featured': True
        },
        {
            'name': 'Stainless Steel Kadai with Lid', 'slug': 'stainless-steel-kadai-with-lid', 'sku': 'VMM-CK-002',
            'description': 'Tri-ply stainless steel kadai with a riveted stainless-steel handle and glass lid.',
            'category': cookware, 'subcategory': steel, 'material': 'Stainless Steel', 'size': '2.5 Litres',
            'price': 1850.00, 'sale_price': 1650.00, 'stock_quantity': 18, 'featured': True
        },
        {
            'name': 'Steel Tope Set (3 Pieces)', 'slug': 'steel-tope-set-3-pieces', 'sku': 'VMM-CK-003',
            'description': 'Set of 3 stainless steel topes in different sizes.',
            'category': cookware, 'subcategory': steel, 'material': 'Stainless Steel', 'size': '1L / 1.5L / 2L',
            'price': 1200.00, 'sale_price': None, 'stock_quantity': 30, 'featured': False
        },
        # Cookware - Non-stick
        {
            'name': 'Non-Stick Dosa Tawa 28cm', 'slug': 'non-stick-dosa-tawa-28cm', 'sku': 'VMM-CK-004',
            'description': 'Premium non-stick dosa tawa with a flat cooking surface for crispy dosas.',
            'category': cookware, 'subcategory': non_stick, 'material': 'Aluminium with Non-Stick Coating', 'size': '28 cm',
            'price': 890.00, 'sale_price': 750.00, 'stock_quantity': 40, 'featured': True
        },
        # Cookware - Cast iron
        {
            'name': 'Cast Iron Skillet 10 Inch', 'slug': 'cast-iron-skillet-10-inch', 'sku': 'VMM-CK-005',
            'description': 'Pre-seasoned cast iron skillet. Perfect for searing, frying, and baking.',
            'category': cookware, 'subcategory': cast_iron, 'material': 'Cast Iron', 'size': '10 Inches',
            'price': 1400.00, 'sale_price': None, 'stock_quantity': 12, 'featured': False
        },
        # Pooja
        {
            'name': 'Brass Pooja Thali Set', 'slug': 'brass-pooja-thali-set', 'sku': 'VMM-PJ-001',
            'description': 'Complete brass pooja thali set including thali, diya, incense holder, kumkum container, and bell.',
            'category': pooja, 'subcategory': None, 'material': 'Brass', 'size': '10 Inch Thali',
            'price': 1800.00, 'sale_price': None, 'stock_quantity': 15, 'featured': True
        },
        {
            'name': 'Copper Pooja Lota', 'slug': 'copper-pooja-lota', 'sku': 'VMM-PJ-002',
            'description': 'Pure copper lota for pooja rituals and daily water storage.',
            'category': pooja, 'subcategory': None, 'material': 'Copper', 'size': '500 ml',
            'price': 650.00, 'sale_price': None, 'stock_quantity': 35, 'featured': False
        },
        # Cutlery
        {
            'name': 'Stainless Steel Spoon Set (12 Pieces)', 'slug': 'stainless-steel-spoon-set-12-pieces', 'sku': 'VMM-CT-001',
            'description': 'Premium quality stainless steel spoon set with mirror polish finish.',
            'category': cutlery, 'subcategory': None, 'material': 'Stainless Steel', 'size': 'Standard',
            'price': 450.00, 'sale_price': None, 'stock_quantity': 50, 'featured': False
        },
        # Dinnerware
        {
            'name': 'Stainless Steel Dinner Set (24 Pieces)', 'slug': 'stainless-steel-dinner-set-24-pieces', 'sku': 'VMM-DW-001',
            'description': 'Complete 24-piece dinner set: 6 full plates, 6 quarter plates, 6 bowls, and 6 glasses.',
            'category': dinnerware, 'subcategory': None, 'material': 'Stainless Steel', 'size': '24 Pieces',
            'price': 3200.00, 'sale_price': 2899.00, 'stock_quantity': 10, 'featured': True
        },
        # Storage
        {
            'name': 'Airtight Storage Container Set (5 Pieces)', 'slug': 'airtight-storage-container-set-5-pieces', 'sku': 'VMM-ST-001',
            'description': 'Set of 5 airtight stainless steel containers with see-through lids.',
            'category': storage, 'subcategory': None, 'material': 'Stainless Steel', 'size': '250ml / 500ml / 750ml / 1L / 1.5L',
            'price': 1650.00, 'sale_price': None, 'stock_quantity': 22, 'featured': True
        },
        # Household
        {
            'name': 'Stainless Steel Water Bottle 1L', 'slug': 'stainless-steel-water-bottle-1l', 'sku': 'VMM-HH-001',
            'description': 'Single-wall stainless steel water bottle with a leak-proof cap.',
            'category': household, 'subcategory': None, 'material': 'Stainless Steel', 'size': '1 Litre',
            'price': 350.00, 'sale_price': None, 'stock_quantity': 60, 'featured': False
        },
        # Stoves
        {
            'name': '3-Burner Gas Stove', 'slug': '3-burner-gas-stove', 'sku': 'VMM-GS-001',
            'description': 'Toughened glass top 3-burner gas stove with heavy-duty brass burners.',
            'category': stoves, 'subcategory': None, 'material': 'Toughened Glass & Stainless Steel', 'size': '3 Burners',
            'price': 3500.00, 'sale_price': 3199.00, 'stock_quantity': 8, 'featured': True
        },
        # Bathroom
        {
            'name': 'Stainless Steel Soap Dish', 'slug': 'stainless-steel-soap-dish', 'sku': 'VMM-BT-001',
            'description': 'Wall-mounted stainless steel soap dish with drainage holes.',
            'category': bathroom, 'subcategory': None, 'material': 'Stainless Steel', 'size': 'Standard',
            'price': 280.00, 'sale_price': None, 'stock_quantity': 45, 'featured': False
        },
        # Extra Cookware
        {
            'name': 'Aluminium Idli Maker 4-Plate', 'slug': 'aluminium-idli-maker-4-plate', 'sku': 'VMM-CK-006',
            'description': 'Traditional aluminium idli maker with 4 plates.',
            'category': cookware, 'subcategory': aluminium, 'material': 'Aluminium', 'size': '4 Plates / 16 Idlis',
            'price': 780.00, 'sale_price': None, 'stock_quantity': 20, 'featured': False
        },
        {
            'name': 'Copper Bottom Handi 3L', 'slug': 'copper-bottom-handi-3l', 'sku': 'VMM-CK-007',
            'description': 'Stainless steel handi with copper bottom for superior heat conduction.',
            'category': cookware, 'subcategory': steel, 'material': 'Stainless Steel with Copper Bottom', 'size': '3 Litres',
            'price': 950.00, 'sale_price': None, 'stock_quantity': 18, 'featured': False
        },
        # Extra Stoves
        {
            'name': 'Mixer Grinder 750W', 'slug': 'mixer-grinder-750w', 'sku': 'VMM-GS-002',
            'description': 'Powerful 750W mixer grinder with 3 stainless steel jars.',
            'category': stoves, 'subcategory': None, 'material': 'ABS Body, Stainless Steel Jars', 'size': '750 Watts',
            'price': None, 'sale_price': None, 'stock_quantity': 5, 'featured': False
        }
    ]

    for p in products_data:
        Product.objects.create(**p)

    print(f"Successfully seeded {len(products_data)} products and 12 categories!")

if __name__ == '__main__':
    seed()
