from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('api/ai-plans/', include('ai_plans.urls')),
    path('admin/', admin.site.urls),
    path('api/users/', include('users.urls')), 
]
