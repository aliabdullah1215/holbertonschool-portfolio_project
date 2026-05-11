from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import NotFound

from .models import DoctorApplication
from .serializers import DoctorApplicationSerializer, ApprovedDoctorSerializer
from .permissions import IsDoctorUser, IsClientUser


class DoctorApplicationView(generics.GenericAPIView):
    serializer_class = DoctorApplicationSerializer
    permission_classes = [IsDoctorUser]

    def get(self, request):
        try:
            application = DoctorApplication.objects.get(user=request.user)
        except DoctorApplication.DoesNotExist:
            raise NotFound("No application found.")

        serializer = self.get_serializer(application, context={'request': request})
        return Response(serializer.data)

    def post(self, request):
        if DoctorApplication.objects.filter(user=request.user).exists():
            return Response(
                {"detail": "You already submitted an application."},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = self.get_serializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ApprovedDoctorListView(generics.ListAPIView):
    serializer_class = ApprovedDoctorSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return DoctorApplication.objects.filter(status='approved').select_related('user')
