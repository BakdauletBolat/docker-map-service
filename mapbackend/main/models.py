from django.db import models
from city.models import Localities
from model_clone import CloneMixin
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



class PolyLine(CloneMixin,models.Model):
    km = models.IntegerField(blank=True, null=True)
    name = models.CharField(max_length=255, blank=True,null=True)
    color = models.CharField(max_length=255, blank=True, null=True)
    localities = models.ForeignKey(Localities, on_delete=models.CASCADE, related_name='polylines', verbose_name='Елді мекендер',default=2)
    typeMarker = models.ForeignKey(PolyLineTypes, null=True, blank=True, on_delete=models.CASCADE, related_name="polyline")

    _clone_m2o_or_o2m_fields = ['positionGroup']

    def __str__(self):
        return f"{self.name} Type: {self.typeMarker}"

    class Meta:
        verbose_name = 'Полилиния'
        verbose_name_plural = 'Полилиниялар'

class PolyLineRoad(models.Model):

    width = models.CharField('Ені', max_length=255,null=True,blank=True)
    hectar = models.CharField('Гектар', max_length=255,null=True,blank=True)
    beton = models.CharField('Асфальт', max_length=255,null=True,blank=True)
    topirak = models.CharField('Топырак',max_length=255,null=True,blank=True)
    shagal_tas = models.CharField('Шағал тас',max_length=255,null=True,blank=True)
    goodSituation = models.CharField('жақсы шқ.', max_length=255,null=True,blank=True)
    badSituation = models.CharField('қанағатсыз, шқ.', max_length=255,null=True,blank=True)
    yearConstruction = models.CharField('Салынған жылы ',max_length=255,null=True,blank=True)
    polyline = models.OneToOneField(PolyLine, verbose_name='Полилиния',related_name='road',on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Полилиния жол'
        verbose_name_plural = 'Полилиния жолдар'

    def __str__(self):
        return f"{self.polyline.name} -- дорога"



class PositionGroup(CloneMixin,models.Model):
    polyline = models.ForeignKey(PolyLine,on_delete=models.CASCADE,null=True,blank=True,related_name='positionGroup')

    _clone_m2o_or_o2m_fields = ['positions']

    def __str__(self):
        return f"{self.polyline.name} -- позиционное группа"

    class Meta:
        verbose_name = 'Позиция группа'
        verbose_name_plural = 'Позициялар группа'
    
class Positions(models.Model):

    index = models.IntegerField(blank=True, null=True)
    lat = models.FloatField(null=True, blank=True)
    lng = models.FloatField(null=True, blank=True)
    posGroup = models.ForeignKey(PositionGroup,on_delete=models.CASCADE,related_name='positions',null=True,blank=True)

    def __str__(self):

        return f"{self.posGroup} -- позиция"

    class Meta:
        verbose_name = 'Позиция'
        verbose_name_plural = 'Позициялар'



