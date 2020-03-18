from django.apps import apps
from django.template import Context, Template
from django.conf import settings

from app.celery import app


@app.task
def send_email_task(logo_url, to, email_type_key, **kwargs):
    EmailType = apps.get_model('emails', 'EmailType')  # need to import model like this or get circular import
    Email = apps.get_model('emails', 'Email')  # need to import model like this or get circular import

    email_type = EmailType.objects.get(key=email_type_key)
    context = {
        'title': email_type.title,
        'logo_url': logo_url,
        **kwargs
    }
    c = Context(context)
    t = Template(f'{settings.DEFAULT_EXTENSION_TEMPLATE_START}{email_type.template}{settings.DEFAULT_EXTENSION_TEMPLATE_END}')

    body = t.render(c)

    email = Email(
        to=to,
        subject=email_type.subject,
        compiled_template=body
    )
    email.save()
    email.send()
