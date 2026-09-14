from rest_framework import serializers
from store.models import Category, Product, Customer, Order, OrderItem
import re

size_pattern = re.compile(r'\s+((?:\d+(?:\.\d+)?\s*(?:LTR|L|CM|MM|KG|PCS|LITRE)S?)|(?:\d+x\d+\s*CM))$', re.IGNORECASE)

def get_base_name_and_size(name):
    match = size_pattern.search(name)
    if match:
        base_name = name[:match.start()].strip()
        size = match.group(1).strip()
        return base_name, size
    return name, None

class CategorySerializer(serializers.ModelSerializer):
    is_active = serializers.BooleanField(source='active')
    parent = serializers.PrimaryKeyRelatedField(source='parent_category', read_only=True)
    parent_name = serializers.CharField(source='parent_category.name', read_only=True, allow_null=True)

    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description', 'image', 'parent', 'parent_name', 'is_active']


class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_slug = serializers.CharField(source='category.slug', read_only=True)
    subcategory_name = serializers.CharField(source='subcategory.name', read_only=True, allow_null=True)
    subcategory_slug = serializers.CharField(source='subcategory.slug', read_only=True, allow_null=True)
    
    primary_image = serializers.SerializerMethodField()
    images = serializers.SerializerMethodField()
    related_sizes = serializers.SerializerMethodField()
    
    is_active = serializers.BooleanField(source='active')
    is_featured = serializers.BooleanField(source='featured')
    
    price = serializers.FloatField(allow_null=True, required=False)
    sale_price = serializers.FloatField(allow_null=True, required=False)
    
    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'description', 
            'category', 'category_name', 'category_slug',
            'subcategory', 'subcategory_name', 'subcategory_slug',
            'material', 'size', 'price', 'sale_price', 'stock_quantity', 
            'primary_image', 'images', 'is_active', 'is_featured', 'is_in_stock', 'related_sizes'
        ]

    def get_primary_image(self, obj):
        request = self.context.get('request')
        if obj.image:
            url = obj.image.url
            if url.startswith('http://') or url.startswith('https://'):
                return url
            if request:
                return request.build_absolute_uri(url)
            return url
        if obj.image_url:
            return obj.image_url
        return None

    def get_images(self, obj):
        if isinstance(obj.additional_images, list):
            return obj.additional_images
        return []

    def get_related_sizes(self, obj):
        # Fetch explicitly defined size variants
        variants = obj.size_variants.all()
        if variants.exists():
            sizes = []
            for p in variants:
                sizes.append({
                    'id': p.id,
                    'name': f"{obj.name} - {p.size}",
                    'slug': obj.slug, # Use the main product slug, sizes are now selected on the same page
                    'size_label': p.size,
                    'price': float(p.price) if p.price else None,
                    'sale_price': float(p.sale_price) if p.sale_price else None,
                    'stock_quantity': p.stock_quantity,
                })
            sizes.sort(key=lambda x: str(x['size_label']))
            return sizes

        return []


class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    
    class Meta:
        model = OrderItem
        fields = ['product', 'product_name', 'quantity', 'unit_price', 'total_price']


class OrderCreateSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)
    
    # Frontend sends name, phone, email directly from customer info
    name = serializers.CharField(write_only=True)
    phone = serializers.CharField(write_only=True)
    email = serializers.EmailField(write_only=True, required=False, allow_blank=True)

    class Meta:
        model = Order
        fields = [
            'name', 'phone', 'email',
            'subtotal', 'delivery_charge', 'total',
            'address', 'city', 'state', 'pincode', 'notes',
            'items'
        ]

    def create(self, validated_data):
        items_data = validated_data.pop('items', [])
        
        # Extract customer info
        c_name = validated_data.pop('name')
        c_phone = validated_data.pop('phone')
        c_email = validated_data.pop('email', '')

        # Get or create customer
        customer, _ = Customer.objects.get_or_create(
            phone=c_phone,
            defaults={'name': c_name, 'email': c_email}
        )

        # Create order
        order = Order.objects.create(customer=customer, **validated_data)

        # Create order items and decrement stock
        for item_data in items_data:
            product = item_data['product']
            quantity = item_data['quantity']
            
            # Use product price if unit_price/total_price not sent properly in payload
            unit_price = product.price if product.price else 0
            
            # Allow specifying size_variant
            size_variant_id = item_data.get('size_variant_id')
            size_variant = None
            if size_variant_id:
                try:
                    from store.models import ProductSizeVariant
                    size_variant = ProductSizeVariant.objects.get(id=size_variant_id, product=product)
                    if size_variant.price:
                        unit_price = size_variant.price
                except:
                    pass
                    
            total_price = unit_price * quantity
            
            OrderItem.objects.create(
                order=order, 
                product=product,
                size_variant=size_variant,
                quantity=quantity,
                unit_price=unit_price,
                total_price=total_price
            )
            
            # Decrement stock
            if size_variant:
                if size_variant.stock_quantity >= quantity:
                    size_variant.stock_quantity -= quantity
                    size_variant.save()
            else:
                if product.stock_quantity >= quantity:
                    product.stock_quantity -= quantity
                    product.save()

        return order


class OrderReadSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    customer_name = serializers.CharField(source='customer.name', read_only=True)
    customer_phone = serializers.CharField(source='customer.phone', read_only=True)
    customer_email = serializers.CharField(source='customer.email', read_only=True)

    class Meta:
        model = Order
        fields = [
            'id', 'order_number', 'customer_name', 'customer_phone', 'customer_email', 'status', 
            'subtotal', 'delivery_charge', 'total', 
            'address', 'city', 'state', 'pincode', 'notes', 
            'created_at', 'items'
        ]
