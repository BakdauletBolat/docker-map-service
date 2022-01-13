# Generated by Django 3.2.8 on 2022-01-11 15:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0016_alter_positiongroup_options'),
    ]

    operations = [
        migrations.AddField(
            model_name='polylineroad',
            name='shagal_tas',
            field=models.CharField(default=1, max_length=255, verbose_name='Шағал тас'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='polylineroad',
            name='topirak',
            field=models.CharField(default=1, max_length=255, verbose_name='Топырак'),
            preserve_default=False,
        ),
    ]
