# Generated by Django 3.2.8 on 2022-01-14 18:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('city', '0010_auto_20220114_1847'),
    ]

    operations = [
        migrations.AlterField(
            model_name='localitieswater',
            name='nysan',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='2022ж ағымдағы жөндеуден өтетін'),
        ),
    ]