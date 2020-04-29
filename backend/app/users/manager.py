from django.contrib.auth.models import UserManager

from app.registration.models import RegistrationProfile


class CustomUserManager(UserManager):
    @classmethod
    def normalize_email(cls, email):
        return email.lower()

    def create_superuser(self, username, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        user = self._create_user(username, email, password, **extra_fields)

        RegistrationProfile.objects.create(user=user, code_used=True, code_type='RV')

        return user
