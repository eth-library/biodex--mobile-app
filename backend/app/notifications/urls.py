from django.urls import path

from app.notifications.views import ListCreateNotificationType, RetrieveUpdateDestroyNotificationType

urlpatterns = [
    path('', ListCreateNotificationType.as_view(), name='list-create-notification-type'),
    path('<int:pk>/', RetrieveUpdateDestroyNotificationType.as_view(), name='retrieve-update-destroy-notification-type'),
]
