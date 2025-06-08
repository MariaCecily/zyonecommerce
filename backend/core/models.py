# backend/core/models.py
from django.db import models
from django.contrib.auth.models import User # Django's built-in User model
from django.db.models import Index # Import Index for defining indexes

class Category(models.Model):
    name = models.CharField(max_length=255, unique=True)
    # Slug is crucial for clean, SEO-friendly URLs in the frontend
    slug = models.SlugField(max_length=255, unique=True, help_text="A unique identifier for the category, used in URLs. E.g., 'home-appliances'")
    description = models.TextField(blank=True, null=True)

    class Meta:
        verbose_name_plural = "Categories" # Correct pluralization for the admin interface
        ordering = ['name'] # Order categories alphabetically

    def __str__(self):
        return self.name

class Product(models.Model):
    # ForeignKey to Category, related_name allows access to products from a category instance
    category = models.ForeignKey(Category, related_name='products', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    # Slug for individual product URLs
    slug = models.SlugField(max_length=255, unique=True, help_text="A unique identifier for the product, used in URLs. E.g., 'samsung-washing-machine'")
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2) # Max 99,999,999.99
    # ImageField requires Pillow library to be installed
    image = models.ImageField(upload_to='products/', blank=True, null=True, help_text="Upload a product image")
    stock = models.IntegerField(default=0) # Current quantity in stock
    available = models.BooleanField(default=True) # Whether the product is currently visible/purchasable
    created_at = models.DateTimeField(auto_now_add=True) # Automatically sets on creation
    updated_at = models.DateTimeField(auto_now=True) # Automatically updates on each save

    class Meta:
        ordering = ('name',) # Default ordering for products
        # Corrected: Replaced index_together with indexes
        indexes = [
            Index(fields=['id', 'slug']), # This improves performance for lookups by id and slug
        ]

    def __str__(self):
        return self.name

# You'll likely need more models for a full e-commerce site, such as:
# UserProfile (for extended user details if needed, connected to Django's User)
# Cart (for shopping cart functionality)
# CartItem (items in the cart)
# Order (a customer's complete order)
# OrderItem (individual items within an order)
# Address (for shipping/billing)
# Review (for product reviews)
# Discount / Coupon (for promotions)