from rest_framework import permissions


class ObjNotLoggedInUser(permissions.BasePermission):
    message = 'Users cannot follow or unfollow themselves.'

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True
        # requesting user must be .
        return obj != request.user
