from django.urls import path
from .views import (
    ApprovedDoctorListView, 
    CurrentUserView, 
    DoctorApplicationView, 
    RegisterView,
    LoginView # Ensure LoginView is defined in views.py
)

urlpatterns = [
    # Auth endpoints
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('me/', CurrentUserView.as_view(), name='current-user'),
    
    # Doctor related endpoints
    path('doctor-application/', DoctorApplicationView.as_view(), name='doctor-application'),
    path('approved-doctors/', ApprovedDoctorListView.as_view(), name='approved-doctors'),
]