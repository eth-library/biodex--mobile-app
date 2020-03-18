from django.template import Context, Template
from django.apps import apps
from app.celery import app
from app.emails.models import Email
from django.conf import settings


@app.task
def send_notification_task(notification_key, **kwargs):
    try:
        NotificationType = apps.get_model('notifications', 'NotificationType')  # need to import model like this or get circular import
        notification_type = NotificationType.objects.get(key=notification_key)
        for user_notification_profile in notification_type.subscribed_user_notification_profiles.all():
            context = {
                'title': notification_type.title,
                **kwargs
            }
            c = Context(context)
            t = Template(f'{settings.DEFAULT_EXTENSION_TEMPLATE_START}{notification_type.template}{settings.DEFAULT_EXTENSION_TEMPLATE_END}')

            body = t.render(c)

            email = Email(
                to=user_notification_profile.user.email,
                subject=notification_type.subject,
                compiled_template=body
            )
            email.save()
            email.send()
    except NotificationType.DoesNotExist:
        pass
