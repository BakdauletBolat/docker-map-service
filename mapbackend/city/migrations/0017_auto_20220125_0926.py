# Generated by Django 3.2.8 on 2022-01-25 09:26

import city.newFields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('city', '0016_localitiesgas_populationcount'),
    ]

    operations = [
        migrations.AlterField(
            model_name='localitieselectr',
            name='aCOM',
            field=city.newFields.BIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='localitieselectr',
            name='aOJT',
            field=city.newFields.BIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='localitieselectr',
            name='aOZ',
            field=city.newFields.BIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='localitieselectr',
            name='bCOM',
            field=city.newFields.BIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='localitieselectr',
            name='bOJT',
            field=city.newFields.BIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='localitieselectr',
            name='bOZ',
            field=city.newFields.BIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='localitieselectr',
            name='baganaNumber',
            field=city.newFields.BIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='localitieselectr',
            name='cipCOM',
            field=city.newFields.BIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='localitieselectr',
            name='cipLength',
            field=city.newFields.BIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='localitieselectr',
            name='cipOJT',
            field=city.newFields.BIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='localitieselectr',
            name='cipOZ',
            field=city.newFields.BIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='localitieselectr',
            name='length',
            field=city.newFields.BIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='localitieselectr',
            name='tmOCOM',
            field=city.newFields.BIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='localitieselectr',
            name='tmOJT',
            field=city.newFields.BIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='localitieselectr',
            name='tmOOZ',
            field=city.newFields.BIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='localitieselectr',
            name='trCOM',
            field=city.newFields.BIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='localitieselectr',
            name='trCip',
            field=city.newFields.BIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='localitieselectr',
            name='trNumber',
            field=city.newFields.BIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='localitieselectr',
            name='trOJT',
            field=city.newFields.BIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='localitieselectr',
            name='trVl',
            field=city.newFields.BIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='localitieselectr',
            name='trbaganaNumber',
            field=city.newFields.BIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='localitiesgas',
            name='bottomGasLength',
            field=city.newFields.BCharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='localitiesgas',
            name='gasLength',
            field=city.newFields.BCharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='localitiesgas',
            name='grpsh',
            field=city.newFields.BCharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='localitiesgas',
            name='jGasLength',
            field=city.newFields.BCharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='localitiesgas',
            name='oGasLength',
            field=city.newFields.BCharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='localitiesgas',
            name='populationCount',
            field=city.newFields.BIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='localitiesgas',
            name='subscribersCount',
            field=city.newFields.BIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='localitiesgas',
            name='tomenKysym',
            field=city.newFields.BCharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='localitiesgas',
            name='topGasLength',
            field=city.newFields.BCharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='localitiesgas',
            name='typeGas',
            field=city.newFields.BCharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='localitiesgas',
            name='volumeGas',
            field=city.newFields.BCharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='localitiesgas',
            name='yearConstruction',
            field=city.newFields.BIntegerField(blank=True, null=True),
        ),
    ]
