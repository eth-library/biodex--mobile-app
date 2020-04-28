from django.contrib.auth.base_user import BaseUserManager


class CustomUserManager(BaseUserManager):
    @classmethod
    def normalize_email(cls, email):
        return email.lower()
