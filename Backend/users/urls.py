from django.urls import path
from .views import RegisterView, LoginView, CurrentUserView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('me/', CurrentUserView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
]
