from django.conf import settings
from django.core.mail import EmailMessage
from django.db import models
from django.dispatch import receiver
from django.utils.safestring import mark_safe
from django_extensions.db.models import TimeStampedModel

from app.emails.signals import send_email
from app.emails.tasks import send_email_task


class DevEmails(models.Model):
    email = models.EmailField(
        verbose_name='dev email'
    )

    def __str__(self):
        return self.email


class Email(TimeStampedModel):
    template_name = 'mail_base.html'

    to = models.EmailField(
        verbose_name='To',
    )
    subject = models.CharField(
        verbose_name='Subject',
        max_length=200,
    )
    compiled_template = models.TextField(
        verbose_name='compiled_template',
        blank=True,
    )
    bcc = models.TextField(
        verbose_name='bcc',
        blank=True,
    )
    is_sent = models.BooleanField(
        verbose_name='is_sent',
        default=False,
    )

    def send(self):
        if not settings.DEBUG or len(DevEmails.objects.filter(email=self.to)) > 0:
            message = EmailMessage(
                subject=self.subject,
                body=mark_safe(self.compiled_template),
                to=self.to.split(','),
                bcc=self.bcc.split(',')
            )
            message.content_subtype = "html"
            message.send()
            self.is_sent = True
            self.save()

    def __str__(self):
        return f'{self.to} - {self.subject}'


class EmailType(models.Model):
    key = models.CharField(
        verbose_name='email key',
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
    template = models.TextField(
        verbose_name='template extension'
    )

    def __str__(self):
        return self.key


@receiver(send_email)
def send_email(sender, request, to, email_type, **kwargs):
    # signals only purpose in the registration module is to extract logo_url, otherwise could just call task in serializer.
    logo_url = request.build_absolute_uri(settings.STATIC_URL)
    print('url send email', logo_url)
    kwargs.pop('signal', None)
    send_email_task.delay(logo_url, to, email_type, **kwargs)  # send async task to celery
