# Generated by Django 5.1.1 on 2024-11-11 04:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('spotify_api', '0003_vote'),
    ]

    operations = [
        migrations.AlterField(
            model_name='spotifytoken',
            name='access_token',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='spotifytoken',
            name='refresh_token',
            field=models.CharField(blank=True, max_length=255),
        ),
    ]
