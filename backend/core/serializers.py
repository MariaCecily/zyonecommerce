# backend/core/serializers.py
from rest_framework import serializers
from .models import Category, Product

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        # Expose all fields from the Category model
        fields = ['id', 'name', 'slug', 'description']

class ProductSerializer(serializers.ModelSerializer):
    # Nested serializer to include full category details when fetching a product
    category = CategorySerializer(read_only=True)

    # If you want to allow creating/updating products by category ID
    # You might add a write-only field or adjust the `category` field if needed for write operations
    # category_id = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), source='category', write_only=True)


    class Meta:
        model = Product
        # Fields to be included in the API response for Product
        fields = ['id', 'name', 'slug', 'description', 'price', 'image', 'stock', 'available', 'category']
        # If you added category_id for writing, you'd include it here too.