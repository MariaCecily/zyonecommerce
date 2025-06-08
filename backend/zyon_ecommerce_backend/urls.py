# backend/zyon_ecommerce_backend/urls.py
from django.contrib import admin
from django.urls import path, include
# from django.conf import settings # No longer needed if static is removed
# from django.conf.urls.static import static # No longer needed if static is removed

# Optional: Import a view for the root path
from core import views as core_views # Assuming you'll add api_root_drf to core/views.py

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('core.urls')), # Include your core app's API URLs under /api/
    # Optional: Add a path for the API root to return a message instead of 404
    path('', core_views.api_root_drf), # If you create this view in core/views.py
]

# Note: Serving media files in production requires cloud storage (e.g., AWS S3, Cloudinary).
# The 'static' helper is only for Django's development server and should NOT be used in production.
# WhiteNoise automatically handles static files defined in STATIC_ROOT in production.