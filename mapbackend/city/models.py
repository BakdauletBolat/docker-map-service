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

    streetCount = models.CharField(verbose_name='Көше саны',null=True,blank=True,max_length=255)
    populationCount = models.CharField(verbose_name='Халық саны',null=True,blank=True,max_length=255)
    subscribersCount = models.CharField(verbose_name='Абонент саны ',null=True,blank=True,max_length=255)
    springSource = models.CharField(verbose_name='Бұлақ көзі',max_length=255,null=True,blank=True)
    waterDebit = models.CharField(verbose_name='Судың дебеті',max_length=255,null=True,blank=True)
    waterReserves = models.CharField(verbose_name='Жер асты су қоры хаттамасы',max_length=255,null=True,blank=True)
    waterLength = models.CharField(verbose_name='Су құбырының ұзындығы (км)',max_length=255,null=True,blank=True)
    diametress = models.ManyToManyField(Diametr,verbose_name='Диаметры',related_name='localitiesWater',blank=True)
    yearConstruction = models.CharField(verbose_name='Салынған жылы',null=True,blank=True,max_length=255)
    zaramdyQ = models.CharField(verbose_name='Жарамды құбырлар  (ш.қ)', max_length=255,null=True,blank=True)
    currentQ = models.CharField(verbose_name='Жаңартылып жатқаны (2021-2022ж)',max_length=255,null=True,blank=True)
    nysan = models.CharField(verbose_name='2022ж ағымдағы жөндеуден өтетін',null=True,blank=True,max_length=255)
    waterStructure = models.CharField(verbose_name='Су құбырының құрылымы',max_length=255,null=True,blank=True)
    newPipes = models.CharField(verbose_name='Жаңартылған құбырлар (км)',max_length=255,null=True,blank=True)
    newYearConstruction = models.CharField(verbose_name='Жаңартылған жылы',null=True,blank=True,max_length=255)
    needToUpdate = models.CharField(verbose_name='Жаңартуды қажет ететіні (км) ',max_length=255,null=True,blank=True)
    wateMetersCount = models.CharField(verbose_name='Су есептегіш құралдары орнатылған (саны)',null=True,blank=True,max_length=255)
    waterMatersDontCount = models.CharField(verbose_name='Су есептегіш құралдары орнатылмаған (саны)',null=True,blank=True,max_length=255)
    localities = models.OneToOneField(Localities, on_delete=models.CASCADE, verbose_name='Елді мекен',related_name='localitiesWater')


    # def filiable_fields(self):
    #     rTo = []

    #     for fields in self._meta.fields:
    #         if fields.attname == 'id':
    #             continue
    #         rTo.append(fields.getDesk())

    #     return rTo


    def __str__(self):
        return f"Су бойынша {self.localities.name} елді мекенінің информациясы"

    class Meta:
        verbose_name = 'Су бойынша'
        verbose_name_plural = 'Су бойынша'

class LocalitiesElectr(models.Model):

    length = BIntegerField('Электр жүйесінің ұзындығы ',null=True,blank=True)
    cipLength = BIntegerField('CIP жүйесінің ұзындығы',null=True,blank=True)
    baganaNumber = BIntegerField('Бағаналардың жалпы саны (дана)',null=True,blank=True)
    bOJT = BIntegerField('Бағаналар ОЖТ меншігінде',null=True,blank=True)
    aOJT = BIntegerField('Ағаш ОЖТ меншігінде',null=True,blank=True)
    cipOJT = BIntegerField('СИП ОЖТ меншігінде',null=True,blank=True)
    tmOJT = BIntegerField('Темір электр ОЖТ меншігінде',null=True,blank=True)
    trOJT = BIntegerField('Трансформатор ОЖТ меншігінде',null=True,blank=True)

    bCOM = BIntegerField('Бағаналар Комуналдық меншік',null=True,blank=True)
    aCOM = BIntegerField('Ағаш Комуналдық меншік',null=True,blank=True)
    cipCOM = BIntegerField('СИП Комуналдық меншік',null=True,blank=True)
    tmOCOM = BIntegerField('Темір электр Комуналдық меншік',null=True,blank=True)
    trCOM = BIntegerField('Коммуналдық меншікте',null=True,blank=True)

    bOZ = BIntegerField('Бағаналар Өздері орнатқан ',null=True,blank=True)
    aOZ = BIntegerField('Ағаш Өздері орнатқан ',null=True,blank=True)
    cipOZ = BIntegerField('СИП Өздері орнатқан',null=True,blank=True)
    tmOOZ = BIntegerField('Темір Өздері орнатқан',null=True,blank=True)

    trbaganaNumber = BIntegerField('Трансформатордағы бағаналардың жалпы саны (дана)',null=True,blank=True)
    trNumber = BIntegerField('Трансформатор (КТПН)  саны ',null=True,blank=True)
    trCip = BIntegerField('СИП кабель ВЛ-06 кВт (метр)',null=True,blank=True)
    trVl = BIntegerField('ВЛ-04 кВт (метр)',null=True,blank=True)

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
    populationCount = BIntegerField('Халық саны',null=True,blank=True)
    subscribersCount = BIntegerField('Абонент саны ',null=True,blank=True)
    gasLength = BCharField('Газ  құбыры жүйесінің ұзындығы',max_length=255,null=True,blank=True)
    bottomGasLength = BCharField('Жер асты газ құбырлары (метр)',max_length=255,null=True,blank=True)
    topGasLength = BCharField('Жер үсті газ құбырлары (метр)', max_length=255,null=True,blank=True)
    typeGas = BCharField('Құбырлардың құрылымы',max_length=255,null=True,blank=True)
    volumeGas = BCharField('Газ тұтыну көлемі ',max_length=255,null=True,blank=True)
    grpsh = BCharField('ГРПШ-6 саны', max_length=255,null=True,blank=True)

    jGasLength = BCharField('Жоғары қысымды газ құбырлары (ш.қ (км))',max_length=255,null=True,blank=True)
    oGasLength = BCharField('Төмен қысымды газ құбырлары (ш.қ (км))',max_length=255,null=True,blank=True)
    tomenKysym = BCharField('Төмен қысымды құбырлар',max_length=255,null=True,blank=True)

    yearConstruction = BIntegerField('Салынған жылы',null=True,blank=True)
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