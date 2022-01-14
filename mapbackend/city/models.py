from tabnanny import verbose
from django.db import models
from city.newFields import BIntegerField,BOneToOneField,BManyToManyField,BCharField


class Diametr(models.Model):
    diametr = models.CharField('Диаметр',max_length=255)

    def __str__(self):
        return f"{self.diametr}"
    
    class Meta:
        verbose_name = 'Диаметр'
        verbose_name_plural = 'Диаметрлер'

class RuralDistrict(models.Model):
    name = BCharField('Ауылдық округ атауы', max_length=255)
    image = models.ImageField('Фото',upload_to='Rurals/')
    lat = models.FloatField('Лат',null=True,blank=True,default=42.19705782897213)
    lng = models.FloatField('Лат',null=True,blank=True,default=69.95598711561539)

    def __str__(self):
        return self.name
        
    class Meta:
        verbose_name = 'Ауылдық округ'
        verbose_name_plural = 'Ауылдық округтар'
        
class Localities(models.Model):

    name = BCharField('Елді мекен атауы',max_length=255)
    image = models.ImageField('Фото',upload_to='Localities/')
    lat = models.FloatField('Лат',null=True,blank=True,default=42.19705782897213)
    lng = models.FloatField('Лат',null=True,blank=True,default=69.95598711561539)
    rural = models.ForeignKey(RuralDistrict, verbose_name='Ауылдық округ', related_name='localities',on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Елді мекен'
        verbose_name_plural = 'Елді мекендер'


class LocalitiesWater(models.Model):

    streetCount = BIntegerField(verbose_name='Көше саны',null=True,blank=True)
    populationCount = BIntegerField(verbose_name='Халық саны',null=True,blank=True)
    subscribersCount = BIntegerField(verbose_name='Абонент саны ',null=True,blank=True)
    springSource = BCharField(verbose_name='Бұлақ көзі',max_length=255,null=True,blank=True)
    waterDebit = BCharField(verbose_name='Судың дебеті',max_length=255,null=True,blank=True)
    waterReserves = BCharField(verbose_name='Жер асты су қоры хаттамасы',max_length=255,null=True,blank=True)
    waterLength = BCharField(verbose_name='Су құбырының ұзындығы (км)',max_length=255,null=True,blank=True)
    diametress = BManyToManyField(Diametr,verbose_name='Диаметры',related_name='localitiesWater',default=1)
    yearConstruction = BIntegerField(verbose_name='Салынған жылы',null=True,blank=True)
    zaramdyQ = BCharField(verbose_name='Жарамды құбырлар  (ш.қ)', max_length=255,null=True,blank=True)
    currentQ = BCharField(verbose_name='Жаңартылып жатқаны (2021-2022ж)',max_length=255,null=True,blank=True)
    nysan = models.TextField(verbose_name='2022ж ағымдағы жөндеуден өтетін  су құбырлары мен нысандары (ш.қ)',null=True,blank=True)
    waterStructure = BCharField(verbose_name='Су құбырының құрылымы',max_length=255,null=True,blank=True)
    newPipes = BCharField(verbose_name='Жаңартылған құбырлар (км)',max_length=255,null=True,blank=True)
    newYearConstruction = BIntegerField(verbose_name='Жаңартылған жылы',null=True,blank=True)
    needToUpdate = BCharField(verbose_name='Жаңартуды қажет ететіні (км) ',max_length=255,null=True,blank=True)
    wateMetersCount = BIntegerField(verbose_name='Су есептегіш құралдары орнатылған (саны)',null=True,blank=True)
    waterMatersDontCount = BIntegerField(verbose_name='Су есептегіш құралдары орнатылмаған (саны)',null=True,blank=True)
    localities = BOneToOneField(Localities,reqToInput=False, on_delete=models.CASCADE, verbose_name='Елді мекен',related_name='localitiesWater')


    def filiable_fields(self):
        rTo = []

        for fields in self._meta.fields:
            if fields.attname == 'id':
                continue
            rTo.append(fields.getDesk())

        return rTo


    def __str__(self):
        return f"Су бойынша {self.localities.name} елді мекенінің информациясы"

    class Meta:
        verbose_name = 'Су бойынша'
        verbose_name_plural = 'Су бойынша'

class LocalitiesElectr(models.Model):

    length = BIntegerField('Электр жүйесінің ұзындығы ')
    cipLength = BIntegerField('CIP жүйесінің ұзындығы')
    baganaNumber = BIntegerField('Бағаналардың жалпы саны (дана)')
    bOJT = BIntegerField('Бағаналар ОЖТ меншігінде')
    aOJT = BIntegerField('Ағаш ОЖТ меншігінде')
    cipOJT = BIntegerField('СИП ОЖТ меншігінде')
    tmOJT = BIntegerField('Темір электр ОЖТ меншігінде')

    bCOM = BIntegerField('Бағаналар Комуналдық меншік')
    aCOM = BIntegerField('Ағаш Комуналдық меншік')
    cipCOM = BIntegerField('СИП Комуналдық меншік')
    tmOCOM = BIntegerField('Темір электр Комуналдық меншік')

    bOZ = BIntegerField('Бағаналар Өздері орнатқан ')
    aOZ = BIntegerField('Ағаш Өздері орнатқан ')
    cipOZ = BIntegerField('СИП Өздері орнатқан')
    tmOOZ = BIntegerField('Темір Өздері орнатқан')

    trbaganaNumber = BIntegerField('Трансформатордағы бағаналардың жалпы саны (дана)')
    trNumber = BIntegerField('Трансформатор (КТПН)  саны ')
    trCip = BIntegerField('СИП кабель ВЛ-06 кВт (метр)')
    trVl = BIntegerField('ВЛ-04 кВт (метр)')

    localities = BOneToOneField(Localities, reqToInput=False, on_delete=models.CASCADE, verbose_name='Елді мекен',related_name='localitiesElectr')

    def filiable_fields(self):
        rTo = []

        for fields in self._meta.fields:
            if fields.attname == 'id':
                continue
            rTo.append(fields.getDesk())

        return rTo

    def __str__(self):

        return f"Электр бойынша {self.localities.name} елді мекенінің информациясы"

    class Meta:
        verbose_name = 'Электр бойынша'
        verbose_name_plural = 'Электр бойынша'


class LocalitiesGas(models.Model):
    subscribersCount = BIntegerField('Абонент саны ')
    gasLength = BCharField('Газ  құбыры жүйесінің ұзындығы',max_length=255)
    bottomGasLength = BCharField('Жер асты газ құбырлары (метр)',max_length=255)
    topGasLength = BCharField('Жер үсті газ құбырлары (метр)', max_length=255)
    typeGas = BCharField('Құбырлардың құрылымы',max_length=255)
    volumeGas = BCharField('Газ тұтыну көлемі ',max_length=255)
    grpsh = BCharField('ГРПШ-6 саны', max_length=255)
    yearConstruction = BIntegerField('Салынған жылы')
    localities = BOneToOneField(Localities,reqToInput=False, on_delete=models.CASCADE, verbose_name='Елді мекен',related_name='localitiesGas')

    def filiable_fields(self):
        rTo = []

        for fields in self._meta.fields:
            if fields.attname == 'id':
                continue
            rTo.append(fields.getDesk())

        return rTo

    def __str__(self):

        return f"Газ бойынша {self.localities.name} елді мекенінің информациясы"

    class Meta:
        verbose_name = 'Газ бойынша'
        verbose_name_plural = 'Газ бойынша'