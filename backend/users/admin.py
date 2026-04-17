from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import DoctorApplication, DoctorProfile, User

# Register the custom user model
admin.site.register(User, UserAdmin)

# Register the doctor profile model
@admin.register(DoctorProfile)
class DoctorProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'specialty', 'is_verified')  # Columns shown in the admin list
    list_filter = ('is_verified', 'specialty')  # Filters shown in the admin sidebar
    search_fields = ('user__username', 'specialty')  # Search fields for quick lookup


@admin.register(DoctorApplication)
class DoctorApplicationAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'specialty', 'status', 'created_at')
    list_filter = ('status', 'specialty')
    search_fields = ('full_name', 'user__username', 'contact_email')
    readonly_fields = ('created_at', 'updated_at', 'reviewed_at')
