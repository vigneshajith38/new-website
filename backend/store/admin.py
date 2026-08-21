from django.contrib import admin
from django.utils.html import format_html
from .models import Category, Product, Customer, Order, OrderItem

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'parent_category', 'active', 'created_at')
    list_filter = ('active', 'parent_category')
    search_fields = ('name', 'description')
    prepopulated_fields = {'slug': ('name',)}


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'sku', 'category', 'price', 'stock_quantity', 'active', 'featured', 'image_preview')
    list_filter = ('active', 'featured', 'category', 'subcategory')
    search_fields = ('name', 'sku', 'description', 'material')
    prepopulated_fields = {'slug': ('name',)}
    list_editable = ('price', 'stock_quantity', 'active', 'featured')

    fieldsets = (
        ('Product Info', {
            'fields': ('name', 'slug', 'sku', 'description', 'category', 'subcategory')
        }),
        ('Specs', {
            'fields': ('material', 'size')
        }),
        ('Pricing & Inventory', {
            'fields': ('price', 'sale_price', 'stock_quantity')
        }),
        ('Images — Upload OR URL', {
            'description': 'You can <strong>upload an image file</strong> from your computer, '
                           '<strong>OR</strong> paste an external image URL. '
                           'If both are provided, the uploaded file takes priority.',
            'fields': ('current_image_preview', 'image', 'image_url', 'additional_images')
        }),
        ('Status', {
            'fields': ('active', 'featured')
        }),
    )

    readonly_fields = ('current_image_preview',)

    def current_image_preview(self, obj):
        url = obj.get_primary_image if obj.pk else None
        if url:
            return format_html(
                '<div style="margin-bottom:8px;">'
                '<img src="{}" style="max-width:250px; max-height:250px; object-fit:contain; '
                'border-radius:8px; border:1px solid #e0e0e0; padding:4px; background:#fafafa;" />'
                '</div>',
                url
            )
        return format_html('<span style="color:#999;">No image set</span>')
    current_image_preview.short_description = 'Current Image'

    def image_preview(self, obj):
        url = obj.get_primary_image
        if url:
            return format_html(
                '<img src="{}" style="width:45px; height:45px; object-fit:cover; border-radius:4px;" />',
                url
            )
        return "No Image"
    image_preview.short_description = 'Image'


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone', 'email', 'created_at')
    search_fields = ('name', 'phone', 'email')


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ('product', 'quantity', 'unit_price', 'total_price')
    can_delete = False


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('order_number', 'customer_name', 'status', 'total', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('order_number', 'customer__name', 'customer__phone')
    inlines = [OrderItemInline]
    readonly_fields = ('order_number', 'customer', 'subtotal', 'delivery_charge', 'total', 'address', 'city', 'state', 'pincode', 'notes')
    
    def customer_name(self, obj):
        return obj.customer.name
    customer_name.short_description = 'Customer'
    
    # Allow changing status only
    def get_readonly_fields(self, request, obj=None):
        if obj:
            return self.readonly_fields
        return self.readonly_fields

