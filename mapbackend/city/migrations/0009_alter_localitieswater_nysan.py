# Generated by Django 3.2.8 on 2022-01-14 18:23

import city.newFields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('city', '0008_auto_20220114_1807'),
    ]

    operations = [
        migrations.AlterField(
            model_name='localitieswater',
            name='nysan',
            field=city.newFields.BCharField(blank=True, max_length=255, null=True, verbose_name='2022ж ағымдағы жөндеуден өтетін  су құбырлары мен нысандары (ш.қ)'),
        ),
    ]
