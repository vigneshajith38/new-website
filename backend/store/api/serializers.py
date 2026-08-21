from rest_framework import serializers
from store.models import Category, Product, Customer, Order, OrderItem

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
    
    is_active = serializers.BooleanField(source='active')
    is_featured = serializers.BooleanField(source='featured')
    
    price = serializers.FloatField(allow_null=True, required=False)
    sale_price = serializers.FloatField(allow_null=True, required=False)
    
    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'sku', 'description', 
            'category', 'category_name', 'category_slug',
            'subcategory', 'subcategory_name', 'subcategory_slug',
            'material', 'size', 'price', 'sale_price', 'stock_quantity', 
            'primary_image', 'images', 'is_active', 'is_featured', 'is_in_stock'
        ]

    def get_primary_image(self, obj):
        request = self.context.get('request')
        if obj.image:
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        if obj.image_url:
            return obj.image_url
        return None

    def get_images(self, obj):
        if isinstance(obj.additional_images, list):
            return obj.additional_images
        return []


class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    product_sku = serializers.CharField(source='product.sku', read_only=True)
    
    class Meta:
        model = OrderItem
        fields = ['product', 'product_name', 'product_sku', 'quantity', 'unit_price', 'total_price']


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
