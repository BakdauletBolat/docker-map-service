# Generated by Django 3.2.8 on 2022-01-25 09:25

import city.newFields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('city', '0015_auto_20220125_0916'),
    ]

    operations = [
        migrations.AddField(
            model_name='localitiesgas',
            name='populationCount',
            field=city.newFields.BIntegerField(default=1),
            preserve_default=False,
        ),
    ]
