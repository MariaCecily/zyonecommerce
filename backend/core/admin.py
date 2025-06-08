# backend/core/admin.py
from django.contrib import admin
from .models import Category, Product

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'description')
    # Automatically fills the slug field based on the name as you type
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'stock', 'available', 'created_at')
    list_filter = ('available', 'category', 'created_at')
    # Allows editing these fields directly from the list view in the admin
    list_editable = ('price', 'stock', 'available')
    prepopulated_fields = {'slug': ('name',)}
    # This makes category selection more efficient for large numbers of categories
    raw_id_fields = ('category',)
    search_fields = ('name', 'description', 'category__name') # Search by product name/desc or category name