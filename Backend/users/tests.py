from django.test import TestCase
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework.test import APIClient
from rest_framework import status
from .models import User, DoctorApplication


class DoctorApplicationTests(TestCase):

    def setUp(self):
        self.client = APIClient()

        self.doctor = User.objects.create_user(
            username='doctor1',
            email='doctor1@example.com',
            password='StrongPass123',
            role='doctor'
        )

        self.client_user = User.objects.create_user(
            username='client1',
            email='client1@example.com',
            password='StrongPass123',
            role='client'
        )

        self.certificate = SimpleUploadedFile(
            name='certificate.pdf',
            content=b'dummy content',
            content_type='application/pdf'
        )

    def _auth(self, user):
        self.client.force_authenticate(user=user)

    def test_doctor_can_submit_application(self):
        self._auth(self.doctor)
        response = self.client.post('/api/users/doctor-application/', {
            'full_name': 'Dr. Ahmad Ali',
            'age': 38,
            'specialty': 'Clinical Nutrition',
            'phone_number': '+966500000000',
            'contact_email': 'doctor@example.com',
            'certificate_file': self.certificate,
        }, format='multipart')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['status'], 'pending')
        self.assertEqual(DoctorApplication.objects.count(), 1)

    def test_doctor_cannot_submit_duplicate_application(self):
        self._auth(self.doctor)
        DoctorApplication.objects.create(
            user=self.doctor,
            full_name='Dr. Ahmad Ali',
            age=38,
            specialty='Clinical Nutrition',
            phone_number='+966500000000',
            contact_email='doctor@example.com',
            certificate_file='doctor_certificates/file.pdf',
        )

        response = self.client.post('/api/users/doctor-application/', {
            'full_name': 'Dr. Ahmad Ali',
            'age': 38,
            'specialty': 'Clinical Nutrition',
            'phone_number': '+966500000000',
            'contact_email': 'doctor@example.com',
            'certificate_file': self.certificate,
        }, format='multipart')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_client_cannot_submit_application(self):
        self._auth(self.client_user)
        response = self.client.post('/api/users/doctor-application/', {
            'full_name': 'Fake Doctor',
            'age': 30,
            'specialty': 'Nutrition',
            'phone_number': '+966500000001',
            'contact_email': 'fake@example.com',
            'certificate_file': self.certificate,
        }, format='multipart')

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_unauthenticated_user_cannot_submit_application(self):
        response = self.client.post('/api/users/doctor-application/', {
            'full_name': 'Fake Doctor',
            'age': 30,
            'specialty': 'Nutrition',
            'phone_number': '+966500000001',
            'contact_email': 'fake@example.com',
            'certificate_file': self.certificate,
        }, format='multipart')

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_doctor_can_get_own_application(self):
        self._auth(self.doctor)
        DoctorApplication.objects.create(
            user=self.doctor,
            full_name='Dr. Ahmad Ali',
            age=38,
            specialty='Clinical Nutrition',
            phone_number='+966500000000',
            contact_email='doctor@example.com',
            certificate_file='doctor_certificates/file.pdf',
        )

        response = self.client.get('/api/users/doctor-application/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['full_name'], 'Dr. Ahmad Ali')

    def test_doctor_gets_404_if_no_application(self):
        self._auth(self.doctor)
        response = self.client.get('/api/users/doctor-application/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_approved_doctors_list_returns_only_approved(self):
        self._auth(self.client_user)

        DoctorApplication.objects.create(
            user=s
