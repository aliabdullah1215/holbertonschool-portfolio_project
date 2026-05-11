from django.urls import path
from .views import (
    RegisterView,
    LoginView,
    CurrentUserView,
    DoctorApplicationView,
    ApprovedDoctorListView,
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('me/', CurrentUserView.as_view(), name='current-user'),
    path('doctor-application/', DoctorApplicationView.as_view(), name='doctor-application'),
    path('approved-doctors/', ApprovedDoctorListView.as_view(), name='approved-doctors'),
]
