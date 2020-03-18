# Very basic Permissions that are not app specific
from rest_framework import permissions


class IsStaffOrSuperuser(permissions.BasePermission):

    def has_permission(self, request, view):
        return request.user.is_staff or request.user.is_superuser
