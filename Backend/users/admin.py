from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import DoctorApplication, DoctorProfile, User

admin.site.register(User, UserAdmin)

@admin.register(DoctorProfile)
class DoctorProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'specialty', 'is_verified')
    list_filter = ('is_verified', 'specialty')
    search_fields = ('user__username', 'specialty')


@admin.register(DoctorApplication)
class DoctorApplicationAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'specialty', 'status', 'created_at')
    list_filter = ('status', 'specialty')
    search_fields = ('full_name', 'user__username', 'contact_email')
    readonly_fields = ('created_at', 'updated_at', 'reviewed_at')
