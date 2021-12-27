from django.db import models
from city.models import Localities
# Create your models here.



class PolyLineTypes(models.Model):
    
    name = models.CharField(max_length=255, blank=True,null=True)

    def __str__(self):
        return f"{self.name} : {self.id}"

    class Meta:
        verbose_name = 'Тип'
        verbose_name_plural = 'Типтер'
    

class Relevant(models.Model):

    question = models.TextField('Өзекті мәселенің атауы ')
    solution = models.TextField('Шешу жолдары')
    waiting_result = models.TextField('Күтілетін нәтиже')
    localty = models.ForeignKey(Localities,on_delete=models.CASCADE,verbose_name='Елді мекен атауы',related_name='localty')
    type = models.ForeignKey(PolyLineTypes,on_delete=models.CASCADE,verbose_name='Тип',related_name='type')

    def __str__(self):

        return f"{self.localty.name}: Мәселе ({self.question})"

    class Meta:
        verbose_name = 'Өзекті мәселе'
        verbose_name_plural = 'Өзекті мәселелер'

class PolyLine(models.Model):
    km = models.IntegerField(blank=True, null=True)
    name = models.CharField(max_length=255, blank=True,null=True)
    color = models.CharField(max_length=255, blank=True, null=True)
    localities = models.ForeignKey(Localities, on_delete=models.CASCADE, related_name='polylines', verbose_name='Елді мекендер',default=2)
    typeMarker = models.ForeignKey(PolyLineTypes, null=True, blank=True, on_delete=models.CASCADE, related_name="polyline")

    def __str__(self):
        return f"{self.name} Type: {self.typeMarker.name}"

    class Meta:
        verbose_name = 'Полилиния'
        verbose_name_plural = 'Полилиниялар'

class PolyLineRoad(models.Model):

    width = models.CharField('Ені', max_length=255)
    hectar = models.CharField('Гектар', max_length=255)
    beton = models.CharField('Асфальт', max_length=255)
    goodSituation = models.CharField('жақсы шқ.', max_length=255)
    badSituation = models.CharField('қанағатсыз, шқ.', max_length=255,null=True,blank=True)
    yearConstruction = models.CharField('Салынған жылы ',max_length=255)
    polyline = models.OneToOneField(PolyLine, verbose_name='Полилиния',related_name='road',on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Полилиния жол'
        verbose_name_plural = 'Полилиния жолдар'
    
class Positions(models.Model):

    index = models.IntegerField(blank=True, null=True)
    lat = models.FloatField(null=True, blank=True)
    lng = models.FloatField(null=True, blank=True)
    polyline = models.ForeignKey(PolyLine,on_delete=models.CASCADE,related_name='positions')

    class Meta:
        verbose_name = 'Позиция'
        verbose_name_plural = 'Позициялар'

