from django.urls import path
from .views import (
    RegisterView,
    LoginView,
    CurrentUserView,
    DoctorApplicationView,
    ApprovedDoctorListView,
    ApproveDoctorApplicationView,
    RejectDoctorApplicationView,
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('me/', CurrentUserView.as_view(), name='current-user'),
    path('doctor-application/', DoctorApplicationView.as_view(), name='doctor-application'),
    path('approved-doctors/', ApprovedDoctorListView.as_view(), name='approved-doctors'),
    path('doctor-applications/<int:pk>/approve/', ApproveDoctorApplicationView.as_view(), name='approve-doctor-application'),
    path('doctor-applications/<int:pk>/reject/', RejectDoctorApplicationView.as_view(), name='reject-doctor-application'),
]
