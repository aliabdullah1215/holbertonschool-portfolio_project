from rest_framework.permissions import BasePermission


class IsDoctorUser(BasePermission):
    """
    Allows access only to authenticated users with role = 'doctor'.
    """
    message = "Access restricted to doctor accounts only."

    def has_permission(self, request, view):
        return (
            request.user
            and request.user.is_authenticated
            and request.user.role == 'doctor'
        )


class IsClientUser(BasePermission):
    """
    Allows access only to authenticated users with role = 'client'.
    """
    message = "Access restricted to client accounts only."

    def has_permission(self, request, view):
        return (
            request.user
            and request.user.is_authenticated
            and request.user.role == 'client'
        )
