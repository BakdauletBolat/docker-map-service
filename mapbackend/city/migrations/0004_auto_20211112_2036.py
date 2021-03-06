# Generated by Django 3.2.8 on 2021-11-12 20:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('city', '0003_auto_20211112_1246'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='localitieswater',
            options={},
        ),
        migrations.CreateModel(
            name='LocalitiesGas',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('subscribersCount', models.IntegerField(verbose_name='Абонент саны ')),
                ('gasLength', models.CharField(max_length=255, verbose_name='Газ  құбыры жүйесінің ұзындығы')),
                ('bottomGasLength', models.CharField(max_length=255, verbose_name='Жер асты газ құбырлары (метр)')),
                ('topGasLength', models.CharField(max_length=255, verbose_name='Жер үсті газ құбырлары (метр)')),
                ('typeGas', models.CharField(max_length=255, verbose_name='Құбырлардың құрылымы')),
                ('volumeGas', models.CharField(max_length=255, verbose_name='Газ тұтыну көлемі ')),
                ('grpsh', models.CharField(max_length=255, verbose_name='ГРПШ-6 саны')),
                ('yearConstruction', models.IntegerField(verbose_name='Салынған жылы')),
                ('localities', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='localitiesGas', to='city.localities', verbose_name='Елді мекен')),
            ],
        ),
        migrations.CreateModel(
            name='LocalitiesElectr',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('length', models.IntegerField(verbose_name='Электр жүйесінің ұзындығы ')),
                ('cipLength', models.IntegerField(verbose_name='CIP жүйесінің ұзындығы')),
                ('baganaNumber', models.IntegerField(verbose_name='Бағаналардың жалпы саны (дана)')),
                ('bOJT', models.IntegerField(verbose_name='Бағаналар ОЖТ меншігінде')),
                ('aOJT', models.IntegerField(verbose_name='Ағаш ОЖТ меншігінде')),
                ('cipOJT', models.IntegerField(verbose_name='СИП ОЖТ меншігінде')),
                ('tmOJT', models.IntegerField(verbose_name='Темір электр ОЖТ меншігінде')),
                ('bCOM', models.IntegerField(verbose_name='Бағаналар Комуналдық меншік')),
                ('aCOM', models.IntegerField(verbose_name='Ағаш Комуналдық меншік')),
                ('cipCOM', models.IntegerField(verbose_name='СИП Комуналдық меншік')),
                ('tmOCOM', models.IntegerField(verbose_name='Темір электр Комуналдық меншік')),
                ('bOZ', models.IntegerField(verbose_name='Бағаналар Өздері орнатқан ')),
                ('aOZ', models.IntegerField(verbose_name='Ағаш Өздері орнатқан ')),
                ('cipOZ', models.IntegerField(verbose_name='СИП Өздері орнатқан')),
                ('tmOOZ', models.IntegerField(verbose_name='Темір Өздері орнатқан')),
                ('localities', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='localitiesElectr', to='city.localities', verbose_name='Елді мекен')),
            ],
            options={
                'verbose_name': 'Электр бойынша',
                'verbose_name_plural': 'Электр бойынша',
            },
        ),
    ]
