# backend/core/views.py (Example)
from rest_framework import viewsets
from rest_framework.decorators import api_view # For the optional api_root_drf
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend # For filtering products by category
from .models import Category, Product # Assuming you have these models
from .serializers import CategorySerializer, ProductSerializer # Assuming you have these serializers

# Optional: View for the API root
@api_view(['GET'])
def api_root_drf(request):
    """
    Returns a simple message for the API root.
    """
    return Response({
        "message": "Zyon E-commerce API is running!",
        "status": "ok",
        "endpoints": {
            "categories": "/api/categories/",
            "products": "/api/products/",
            # Add more as you create them
        }
    })


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'slug' # If you want to lookup categories by slug instead of pk/ID

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'slug' # <--- CRITICAL: Set to 'slug' if you fetch products by slug
    # Add filter backends to allow filtering products by category slug
    filter_backends = [DjangoFilterBackend]
    filterset_fields = {
        'category__slug': ['exact'], # Assumes Product model has a ForeignKey to Category and Category has a 'slug' field
        # 'category__id': ['exact'], # Alternatively, filter by category ID
    }
    # If you also need search/ordering:
    # search_fields = ['name', 'description']
    # ordering_fields = ['name', 'price', 'created_at']

    # If you want to customize the queryset for products (e.g., only active ones)
    # def get_queryset(self):
    #     queryset = super().get_queryset()
    #     return queryset.filter(is_active=True)