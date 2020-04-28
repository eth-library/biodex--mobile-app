from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

from app.users.manager import CustomUserManager


class User(AbstractUser):
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = CustomUserManager()

    email = models.EmailField(unique=True)

    full_name = models.CharField(verbose_name='full name', max_length=200)

    class UserTypes(models.TextChoices):
        STUDENT = 'ST', _('Student')
        EXPERT = 'EX', _('Expert')

    user_type = models.CharField(
        max_length=2,
        choices=UserTypes.choices,
        default=UserTypes.STUDENT
    )

    # cases defined as foreignKey on Case

    def __str__(self):
        return f'User id {self.pk}: {self.email}'
