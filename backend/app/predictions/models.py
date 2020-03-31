from django.contrib.auth import get_user_model
from django.db import models

from app.cases.models import Case

User = get_user_model()


class Prediction(models.Model):
    case = models.ForeignKey(
        on_delete=models.CASCADE,
        related_name='predictions',
        to=Case
    )
    index = models.IntegerField()
    image_url = models.URLField()
    image_id = models.CharField(
        max_length=100
    )
    family = models.CharField(
        max_length=100
    )
    family_prob = models.FloatField(
        verbose_name='family probability',
    )
    subfamily = models.CharField(
        max_length=100
    )
    subfamily_prob = models.FloatField(
        verbose_name='subfamily probability',
    )
    species = models.CharField(
        max_length=100
    )
    species_prob = models.FloatField(
        verbose_name='species probability',
    )
    confirmed = models.BooleanField(
        default=False
    )
    created = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f'Prediction id {self.pk} from case {self.case.pk}'
