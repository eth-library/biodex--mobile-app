from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import ugettext_lazy as _


class CustomUserManager(BaseUserManager):
    @classmethod
    def normalize_email(cls, email):
        return email.lower()
