# Generated by Django 3.0.2 on 2020-03-20 10:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_data_migration'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='full_name',
            field=models.CharField(default='Default Full Name', max_length=200, verbose_name='full name'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='user',
            name='user_type',
            field=models.CharField(choices=[('ST', 'Student'), ('EX', 'Expert')], default='ST', max_length=2),
        ),
        migrations.AlterField(
            model_name='user',
            name='username',
            field=models.CharField(blank=True, max_length=150),
        ),
    ]