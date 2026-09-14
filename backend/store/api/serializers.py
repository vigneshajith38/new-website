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
        base_name, current_size = get_base_name_and_size(obj.name)
        if not current_size:
            return []
            
        # Find all products that start with the base_name
        # Using a simple filter since the DB is small, it shouldn't be a big performance hit
        similar_products = Product.objects.filter(
            name__istartswith=base_name,
            active=True
        ).exclude(id=obj.id)
        
        sizes = []
        for p in similar_products:
            p_base, p_size = get_base_name_and_size(p.name)
            # Make sure it's exactly the same base product and actually has a size
            if p_base.lower() == base_name.lower() and p_size:
                sizes.append({
                    'id': p.id,
                    'name': p.name,
                    'slug': p.slug,
                    'size_label': p_size,
                    'price': float(p.price) if p.price else None,
                })
        
        # Optionally, we can sort them by size label (basic string sort)
        sizes.sort(key=lambda x: x['size_label'])
        return sizes


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
            total_price = unit_price * quantity
            
            OrderItem.objects.create(
                order=order, 
                product=product,
                quantity=quantity,
                unit_price=unit_price,
                total_price=total_price
            )
            
            # Decrement stock (basic implementation)
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
