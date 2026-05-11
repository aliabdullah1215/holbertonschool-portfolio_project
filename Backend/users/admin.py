from django.contrib import admin
from django.utils import timezone
from .models import DoctorApplication


@admin.register(DoctorApplication)
class DoctorApplicationAdmin(admin.ModelAdmin):

    list_display = [
        'full_name',
        'specialty',
        'status',
        'reviewed_at',
        'created_at',
    ]

    list_filter = ['status', 'specialty']

    search_fields = ['full_name', 'contact_email', 'specialty']

    readonly_fields = ['created_at', 'updated_at', 'reviewed_at']

    fields = [
        'user',
        'full_name',
        'age',
        'specialty',
        'phone_number',
        'contact_email',
        'certificate_file',
        'status',
        'reviewed_at',
        'created_at',
        'updated_at',
    ]

    def save_model(self, request, obj, form, change):
        if change:
            original = DoctorApplication.objects.get(pk=obj.pk)
            if original.status == 'pending' and obj.status in ('approved', 'rejected'):
                obj.reviewed_at = timezone.now()
        super().save_model(request, obj, form, change)
