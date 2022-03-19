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
    # polyline = models.ForeignKey("main.PolyLine",on_delete=models.CASCADE,null=True,blank=True)

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

    length = BIntegerField(verbose_name='Электр жүйесінің ұзындығы ',null=True,blank=True)
    cipLength = BIntegerField(verbose_name='CIP жалпы ұзындығы',null=True,blank=True)
    baganaNumber = BIntegerField(verbose_name='Бағаналардың жалпы саны (дана)',null=True,blank=True)
    bOJT = BIntegerField(verbose_name='Бағаналар ОЖТ меншігінде',null=True,blank=True)
    aOJT = BIntegerField(verbose_name='Ағаш ОЖТ меншігінде',null=True,blank=True)
    cipOJT = BIntegerField(verbose_name='СИП ОЖТ меншігінде',null=True,blank=True)
    tmOJT = BIntegerField(verbose_name='Темір электр ОЖТ меншігінде',null=True,blank=True)
    trOJT = BIntegerField(verbose_name='Трансформатор ОЖТ меншігінде',null=True,blank=True)

    bCOM = BIntegerField(verbose_name='Бағаналар Комуналдық меншік',null=True,blank=True)
    aCOM = BIntegerField(verbose_name='Ағаш Комуналдық меншік',null=True,blank=True)
    cipCOM = BIntegerField(verbose_name='СИП Комуналдық меншік',null=True,blank=True)
    tmOCOM = BIntegerField(verbose_name='Темір электр Комуналдық меншік',null=True,blank=True)
    trCOM = BIntegerField(verbose_name='Коммуналдық меншікте',null=True,blank=True)

    bOZ = BIntegerField(verbose_name='Бағаналар Өздері орнатқан ',null=True,blank=True)
    aOZ = BIntegerField(verbose_name='Ағаш Өздері орнатқан ',null=True,blank=True)
    cipOZ = BIntegerField(verbose_name='СИП Өздері орнатқан',null=True,blank=True)
    tmOOZ = BIntegerField(verbose_name='Темір Өздері орнатқан',null=True,blank=True)

    trbaganaNumber = BIntegerField(verbose_name='Трансформатордағы бағаналардың жалпы саны (дана)',null=True,blank=True)
    trNumber = BIntegerField(verbose_name='Трансформатор (КТПН)  саны ',null=True,blank=True)
    trCip = BIntegerField(verbose_name='СИП кабель ВЛ-06 кВт (метр)',null=True,blank=True)
    trVl = BIntegerField(verbose_name='ВЛ-04 кВт (метр)',null=True,blank=True)

    # polyline = models.ForeignKey("main.PolyLine",on_delete=models.CASCADE,null=True,blank=True)
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
    populationCount = BIntegerField(verbose_name='Халық саны',null=True,blank=True)
    subscribersCount = BIntegerField(verbose_name='Абонент саны ',null=True,blank=True)
    gasLength = BCharField(verbose_name='Газ құбыры жүйесінің ұзындығы',max_length=255,null=True,blank=True)
    bottomGasLength = BCharField(verbose_name='Жер асты газ құбырлары (метр)',max_length=255,null=True,blank=True)
    topGasLength = BCharField(verbose_name='Жер үсті газ құбырлары (метр)', max_length=255,null=True,blank=True)
    typeGas = BCharField(verbose_name='Құбырлардың құрылымы',max_length=255,null=True,blank=True)
    volumeGas = BCharField(verbose_name='Газ тұтыну көлемі ',max_length=255,null=True,blank=True)
    grpsh = BCharField(verbose_name='ГРПШ-6 саны', max_length=255,null=True,blank=True)

    jGasLength = BCharField(verbose_name='Жоғары қысымды газ құбырлары (ш.қ (км))',max_length=255,null=True,blank=True)
    oGasLength = BCharField(verbose_name='Орта қысымды газ құбырлары (ш.қ (км))',max_length=255,null=True,blank=True)
    tomenKysym = BCharField(verbose_name='Төмен қысымды құбырлар',max_length=255,null=True,blank=True)

    # polyline = models.ForeignKey("main.PolyLine",on_delete=models.CASCADE,null=True,blank=True)

    yearConstruction = BIntegerField(verbose_name='Салынған жылы',null=True,blank=True)
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