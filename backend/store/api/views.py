from rest_framework import viewsets, filters, status
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from store.models import Category, Product, Order
from .serializers import (
    CategorySerializer, 
    ProductSerializer, 
    OrderCreateSerializer, 
    OrderReadSerializer
)

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Read-only API to list and retrieve categories.
    """
    queryset = Category.objects.filter(active=True)
    serializer_class = CategorySerializer
    lookup_field = 'slug'
    pagination_class = None


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Read-only API to list and retrieve products.
    Supports filtering by category slug, subcategory slug, and search.
    """
    queryset = Product.objects.filter(active=True).select_related('category', 'subcategory')
    serializer_class = ProductSerializer
    lookup_field = 'slug'
    
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['featured', 'category__slug', 'subcategory__slug']
    search_fields = ['name', 'description', 'category__name']
    ordering_fields = ['price', 'created_at', 'name']


class OrderViewSet(viewsets.ModelViewSet):
    """
    API to create orders (from checkout) and retrieve them (for confirmation).
    """
    queryset = Order.objects.all().prefetch_related('items__product')
    lookup_field = 'order_number'
    http_method_names = ['get', 'post', 'head', 'options']

    def get_serializer_class(self):
        if self.action == 'create':
            return OrderCreateSerializer
        return OrderReadSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        order = serializer.save()
        
        # Return the read representation (includes order_number)
        read_serializer = OrderReadSerializer(order)
        headers = self.get_success_headers(read_serializer.data)
        return Response(read_serializer.data, status=status.HTTP_201_CREATED, headers=headers)
