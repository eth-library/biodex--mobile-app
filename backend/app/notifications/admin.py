from django.contrib import admin

from app.notifications.models import NotificationProfile, NotificationType

admin.site.register(NotificationProfile)
admin.site.register(NotificationType)
