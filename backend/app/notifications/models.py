from django.conf import settings
from django.db import models
from django.dispatch import receiver

from app.notifications.tasks import send_notification_task
from app.notifications.signals import notify_users
from app.registration.signals import post_user_registration_validation


class NotificationProfile(models.Model):
    user = models.OneToOneField(
        verbose_name='user',
        on_delete=models.CASCADE,
        related_name='notification_profile',
        to=settings.AUTH_USER_MODEL
    )
    subscribed_notification_types = models.ManyToManyField(
        verbose_name='subscribed notification types',
        to='notifications.NotificationType',
        related_name='subscribed_user_notification_profiles',
        blank=True
    )

    def __str__(self):
        return self.user.email


class NotificationType(models.Model):
    key = models.CharField(
        verbose_name='notification key',
        max_length=200,
        unique=True
    )
    subject = models.CharField(
        verbose_name='subject',
        max_length=200
    )
    title = models.CharField(
        verbose_name='title',
        max_length=200
    )
    description = models.TextField(
        verbose_name='description'
    )
    template = models.TextField(
        verbose_name='template extension'
    )

    def __str__(self):
        return self.key


@receiver(notify_users)
def send_notifications(sender, notification_key, **kwargs):
    kwargs.pop('signal', None)
    request = kwargs.pop('request', None)
    logo_url = request.build_absolute_uri(settings.STATIC_URL)
    print('url', logo_url)
    kwargs['logo_url'] = logo_url
    send_notification_task.delay(notification_key, **kwargs)  # send async task to celery


@receiver(post_user_registration_validation)
def create_social_profile(sender, user, **kwargs):
    if user.is_superuser or user.is_staff:
        NotificationProfile(user=user).save()
