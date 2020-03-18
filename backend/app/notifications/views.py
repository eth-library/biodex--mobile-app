from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated

from app.global_permissions import IsStaffOrSuperuser
from app.notifications.models import NotificationType
from app.notifications.serializers import NotificationTypeSerializer


class ListCreateNotificationType(ListCreateAPIView):
    """
    get:
    List all notification types
    post:
    Create a new notification type
    """
    permission_classes = [IsAuthenticated, IsStaffOrSuperuser]
    serializer_class = NotificationTypeSerializer
    queryset = NotificationType.objects.all()


class RetrieveUpdateDestroyNotificationType(RetrieveUpdateDestroyAPIView):
    """
    get:
    Retrieve a notification type
    patch:
    Update a new notification type
    delete:
    Destroy a notification type
    """
    permission_classes = [IsAuthenticated, IsStaffOrSuperuser]
    serializer_class = NotificationTypeSerializer
    queryset = NotificationType.objects.all()
