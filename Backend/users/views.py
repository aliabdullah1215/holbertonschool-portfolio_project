from rest_framework import generics, permissions, status
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from django.utils import timezone
from rest_framework_simplejwt.tokens import RefreshToken

from .models import DoctorApplication, DoctorProfile
from .serializers import (
    ApprovedDoctorSerializer,
    CurrentUserSerializer,
    DoctorApplicationSerializer,
    UserSerializer,
)


class RegisterView(generics.CreateAPIView):
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
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)

        if user is not None:
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

        return Response(
            {"error": "Invalid username or password"},
            status=status.HTTP_401_UNAUTHORIZED
        )


class CurrentUserView(generics.RetrieveAPIView):
    serializer_class = CurrentUserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user


class DoctorApplicationView(generics.GenericAPIView):
    serializer_class = DoctorApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request, *args, **kwargs):
        try:
            application = DoctorApplication.objects.get(user=request.user)

        except DoctorApplication.DoesNotExist:
            return Response(
                {"detail": "Doctor application not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = self.get_serializer(application)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):

        if request.user.role != 'client':
            return Response(
                {"detail": "Only clients can apply to become doctors."},
                status=status.HTTP_403_FORBIDDEN
            )

        try:
            DoctorApplication.objects.get(user=request.user)

            return Response(
                {"detail": "You already have a doctor application."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        except DoctorApplication.DoesNotExist:
            pass

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        serializer.save(user=request.user)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ApprovedDoctorListView(generics.ListAPIView):
    serializer_class = ApprovedDoctorSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        return DoctorApplication.objects.filter(is_verifyed=True)


class ApproveDoctorApplicationView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def post(self, request, pk):

        try:
            application = DoctorApplication.objects.get(pk=pk)

        except DoctorApplication.DoesNotExist:
            return Response(
                {"detail": "Not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        if application.status != 'pending':
            return Response(
                {"detail": "Application already processed"},
                status=status.HTTP_400_BAD_REQUEST
            )

        if DoctorProfile.objects.filter(user=application.user).exists():
            return Response(
                {"detail": "Doctor already approved"},
                status=status.HTTP_400_BAD_REQUEST
            )

        application.status = "approved"
        application.reviewed_at = timezone.now()
        application.save()

        DoctorProfile.objects.create(
            user=application.user,
            specialty=application.specialty,
            bio="Approved doctor",
            is_verified=True
        )

        application.user.role = "doctor"
        application.user.save()

        return Response({
            "message": "Doctor approved successfully"
        })


class RejectDoctorApplicationView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def post(self, request, pk):

        try:
            application = DoctorApplication.objects.get(pk=pk)

        except DoctorApplication.DoesNotExist:
            return Response(
                {"detail": "Not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        if application.status != 'pending':
            return Response(
                {"detail": "Application already processed"},
                status=status.HTTP_400_BAD_REQUEST
            )

        application.status = "rejected"
        application.reviewed_at = timezone.now()
        application.save()

        return Response({
            "message": "Application rejected"
        })
