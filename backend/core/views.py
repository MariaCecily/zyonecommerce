from django.shortcuts import render
# backend/core/views.py
from rest_framework import viewsets
from rest_framework.decorators import action # To add custom actions to viewsets
from rest_framework.response import Response
from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows categories to be viewed.
    Using ReadOnlyModelViewSet as categories are generally static lookup data.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'slug' # Allow retrieving a single category by its slug (e.g., /api/categories/home-appliances/)

    # Custom action to get products within a specific category
    @action(detail=True, methods=['get'])
    def products(self, request, slug=None):
        category = self.get_object() # Retrieves the category instance based on slug
        products = category.products.filter(available=True) # Get all available products in this category
        # You might want to paginate these products in a real application
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)


class ProductViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows products to be viewed or edited.
    """
    queryset = Product.objects.filter(available=True) # Only show available products by default
    serializer_class = ProductSerializer
    lookup_field = 'slug' # Allow retrieving a single product by its slug (e.g., /api/products/samsung-washing-machine/)

    # You could add custom actions here, e.g., for filtering by price range, etc.