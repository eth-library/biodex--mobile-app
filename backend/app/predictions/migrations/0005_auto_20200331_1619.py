# Generated by Django 3.0.2 on 2020-03-31 14:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('predictions', '0004_prediction_image_url'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='prediction',
            options={'ordering': ['pk']},
        ),
    ]
