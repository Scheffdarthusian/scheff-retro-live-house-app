# Generated by Django 5.1.1 on 2024-10-24 02:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('spotify_api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='spotifytoken',
            name='refresh_token',
            field=models.CharField(blank=True, max_length=150),
        ),
    ]
