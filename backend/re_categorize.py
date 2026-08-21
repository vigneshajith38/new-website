import pandas as pd
import numpy as np
import re

file_path = 'C:/Users/DELL/Documents/Works/shop/kaniyapuram stock updated new.xlsx'
out_path = 'C:/Users/DELL/Documents/Works/shop/kaniyapuram stock updated new (Categorized).xlsx'

df = pd.read_excel(file_path)

def get_categories(row):
    name = str(row['Item name*']).upper()
    old_cat = str(row['Category']).upper()
    cats = set()
    
    # 1. Drinkware
    if any(word in name for word in ['JUG', 'FLASK', 'WATER BOTTLE', 'MUG', 'TUMBLER', 'CUP', 'GLASS', 'BOTTLE']) or old_cat in ['FLASKS', 'WATER BOTTLE']:
        cats.add('Drinkware')
        
    # 2. Pans & Grills
    if any(word in name for word in ['PAN', 'GRILL', 'TAWA', 'CHEENACHETTI', 'FRYPAN', 'DOSA KALLU']):
        cats.add('Pans & Grills')
        
    # 3. Pressure Cookers
    if ('COOKER' in name and 'RICE' not in name) or old_cat == 'COOKERS':
        cats.add('Pressure Cookers')
        
    # 4. Small Appliances
    if old_cat in ['ELECTRIC KITHCHEN', 'ELECTRIC EQUIPMENT', 'ELECTRIC STOVE', 'RICE COOKER', 'STOVE']:
        cats.add('Kitchen Appliances')
        
    # 5. Food Storage & Casseroles
    if any(word in name for word in ['LUNCH BOX', 'CARRIER', 'DUBBA', 'CONTAINER', 'CASROLE']) or old_cat == 'CASROLES':
        cats.add('Food Storage & Casseroles')
        
    # 6. Cleaning Supplies
    if old_cat in ['MAT', 'MOP', 'BRUSHES', 'BROOM']:
        cats.add('Cleaning Supplies')
        
    # 7. Dining & Serveware
    if old_cat in ['GLASS WARES', 'CROCKERIES'] or any(word in name for word in ['PLATE', 'DISH', 'BOWL']):
        cats.add('Dining & Serveware')
        
    # 8. Pooja Vessels
    if old_cat == 'POOJA VESSELS' or 'POOJA' in name or 'AGARBATHI' in name:
        cats.add('Religious & Pooja')
        
    # 9. Plastics
    if 'PLASTIC' in old_cat:
        cats.add('Plastic Home & Kitchen')

    # If it wasn't matched above, check if old_cat has slashes/&
    if not cats:
        if 'CASTE IRON' in old_cat:
            cats.add('Cast Iron Cookware')
        elif 'NON STICK' in old_cat:
            cats.add('Non-Stick Cookware')
        elif 'ALUMINIUM' in old_cat:
            cats.add('Aluminium Cookware')
        elif 'STEEL COOKWARE' in old_cat or 'STEEL' in name:
            cats.add('Steel Cookware')
        elif '/' in old_cat or '&' in old_cat:
            parts = re.split(r'[/&]', old_cat)
            for p in parts:
                if p.strip():
                    cats.add(p.strip().title())
        else:
            cats.add(old_cat.title())

    return list(cats)

df['Category_List'] = df.apply(get_categories, axis=1)
df = df.explode('Category_List')
df['Category'] = df['Category_List']
df = df.drop(columns=['Category_List'])

df.to_excel(out_path, index=False)
print("Saved new file to:", out_path)
print("\nNew Categories Summary:")
print(df['Category'].value_counts())
