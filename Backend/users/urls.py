from django.urls import path
from .views import RegisterView, LoginView, CurrentUserView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('me/', CurrentUserView.as_view(), name='current_user'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]