from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from rest_framework.documentation import include_docs_urls

api_patterns = [
    path('users/', include('app.users.urls')),
    path('auth/', include('app.registration.urls')),
    path('cases/', include('app.cases.urls')),
    path('docs/', include_docs_urls(title='Lepi', permission_classes=[])),
]

urlpatterns = [
    path('mob-api/lepi-admin/', admin.site.urls),
    path('mob-api/admin/', include('admin_honeypot.urls', namespace='admin_honeypot')),
    path('mob-api/', include(api_patterns)),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
