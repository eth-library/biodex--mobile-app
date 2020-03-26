from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class Case(models.Model):
    user = models.ForeignKey(
        on_delete=models.SET_NULL,
        related_name='cases',
        to=User,
        blank=True,
        null=True
    )
    uploaded_image = models.ImageField(
        verbose_name='uploaded image',
        upload_to='uploaded_images/'
    )
    location = models.CharField(
        max_length=50,
        blank=True
    )
    longitude = models.FloatField(
        blank=True,
        null=True
    )
    latitude = models.FloatField(
        blank=True,
        null=True
    )
    created = models.DateTimeField(
        auto_now_add=True
    )
    prediction_exec_time = models.CharField(
        max_length=200
    )
    prediction_model = models.CharField(
        max_length=200
    )
    prediction_status = models.CharField(
        max_length=200
    )
    # predictions defined as foreignKey on Prediction

    def __str__(self):
        return f'Case id {self.pk} from {self.user.email}'
