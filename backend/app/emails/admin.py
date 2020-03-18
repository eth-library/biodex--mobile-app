from django.contrib import admin
from .models import Email, DevEmails, EmailType

admin.site.register(Email)
admin.site.register(DevEmails)
admin.site.register(EmailType)
