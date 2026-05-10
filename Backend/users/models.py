from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings


class User(AbstractUser):
    ROLE_CHOICES = [
        ('client', 'Client'),
        ('doctor', 'Doctor'),
    ]

    role = models.CharField(
        max_length=10,
        choices=ROLE_CHOICES,
        default='client'
    )

    def __str__(self):
        return self.username


class DoctorApplication(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='doctor_application'
    )

    full_name = models.CharField(max_length=255)

    specialization = models.CharField(max_length=255)

    years_of_experience = models.PositiveIntegerField()

    bio = models.TextField()

    certificate = models.FileField(
        upload_to='doctor_certificates/'
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending'
    )

    created_at = models.DateTimeField(auto_now_add=True)

    reviewed_at = models.DateTimeField(
        null=True,
        blank=True
    )

    def __str__(self):
        return f"{self.full_name} - {self.status}"
