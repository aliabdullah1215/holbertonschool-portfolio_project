from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.db import models


class User(AbstractUser):
    ROLE_CHOICES = (
        ('client', 'Client'),
        ('doctor', 'Doctor'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='client')


class DoctorProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='doctor_profile')
    specialty = models.CharField(max_length=100)
    bio = models.TextField()
    is_verified = models.BooleanField(default=False)

    def __str__(self):
        return f"Dr. {self.user.username}"


class DoctorApplication(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    )

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='doctor_application',
    )
    full_name = models.CharField(max_length=150)
    age = models.PositiveIntegerField()
    specialty = models.CharField(max_length=120)
    phone_number = models.CharField(max_length=30)
    contact_email = models.EmailField()
    certificate_file = models.FileField(upload_to='doctor_certificates/')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    reviewed_at = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('-created_at',)

    def __str__(self):
        return f"{self.full_name} ({self.status})"
