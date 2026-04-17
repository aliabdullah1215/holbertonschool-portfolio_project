from rest_framework import generics, permissions, status
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .models import DoctorApplication
from .serializers import (
    ApprovedDoctorSerializer,
    CurrentUserSerializer,
    DoctorApplicationSerializer,
    UserSerializer,
)

class RegisterView(generics.CreateAPIView):
    """
    Handles new user registration.
    Uses UserSerializer to validate and save user data.
    """
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                "user": UserSerializer(user).data,
                "message": "User registered successfully!"
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    """
    Handles user authentication using JWT.
    Returns Access and Refresh tokens upon successful login.
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        # Authenticate user credentials
        user = authenticate(username=username, password=password)

        if user:
            # Generate JWT Refresh and Access tokens
            refresh = RefreshToken.for_user(user)
            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "role": getattr(user, 'role', 'client')
                },
                "message": "Login successful"
            }, status=status.HTTP_200_OK)
        
        # Return 401 if authentication fails
        return Response(
            {"error": "Invalid username or password"}, 
            status=status.HTTP_401_UNAUTHORIZED
        )


class CurrentUserView(generics.RetrieveAPIView):
    """
    Returns the profile information of the currently authenticated user.
    """
    serializer_class = CurrentUserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user


class IsDoctorUser(permissions.BasePermission):
    """
    Custom permission class to allow access only to users with the 'doctor' role.
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role == 'doctor')


class DoctorApplicationView(generics.GenericAPIView):
    """
    Handles Doctor Applications.
    GET: Retrieve the status of the current user's application.
    POST: Submit a new application (Doctors only).
    """
    serializer_class = DoctorApplicationSerializer
    permission_classes = [permissions.IsAuthenticated, IsDoctorUser]
    parser_classes = [MultiPartParser, FormParser]

    def get_queryset(self):
        return DoctorApplication.objects.filter(user=self.request.user)

    def get(self, request, *args, **kwargs):
        application = self.get_queryset().first()

        if not application:
            return Response({"detail": "Doctor application not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(application)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        application = self.get_queryset().first()

        if application:
            return Response(
                {"detail": "You already have a doctor application."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ApprovedDoctorListView(generics.ListAPIView):
    """
    Lists all doctors whose applications have been approved by the admin.
    """
    serializer_class = ApprovedDoctorSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return DoctorApplication.objects.filter(status='approved')