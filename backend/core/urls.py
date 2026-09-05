from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from django.http import HttpResponse

def create_temp_superuser(request):
    from django.contrib.auth.models import User
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
        return HttpResponse("Superuser created successfully! Username: admin, Password: admin123. PLEASE ASK ME TO REMOVE THIS NOW.")
    return HttpResponse("Superuser already exists. Please ask me to remove this code.")

urlpatterns = [
    path('setup-admin/', create_temp_superuser),
    path('admin/', admin.site.urls),
    path('api/', include('store.api.urls')),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

