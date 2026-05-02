# في ملف Backend/settings.py (أو urls.py الرئيسي)
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('users.urls')), 
]