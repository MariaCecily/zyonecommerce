# backend/zyon_ecommerce_backend/urls.py
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('core.urls')), # Include your core app's API URLs under /api/
]

# Serve media files in development (DO NOT use in production with WhiteNoise)
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    # For static files during development, Django's runserver serves them automatically
    # In production, WhiteNoise will handle STATIC_ROOT