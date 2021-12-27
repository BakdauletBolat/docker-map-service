from django.db import models

class RuralDistrict(models.Model):
    name = models.CharField('Ауылдық округ атауы', max_length=255)
    image = models.ImageField('Фото',upload_to='Rurals/')
    lat = models.FloatField('Лат',null=True,blank=True,default=42.19705782897213)
    lng = models.FloatField('Лат',null=True,blank=True,default=69.95598711561539)

    def __str__(self):
        return self.name
        
    class Meta:
        verbose_name = 'Ауылдық округ'
        verbose_name_plural = 'Ауылдық округтар'
        
class Localities(models.Model):

    name = models.CharField('Елді мекен атауы',max_length=255)
    image = models.ImageField('Фото',upload_to='Localities/')
    lat = models.FloatField('Лат',null=True,blank=True,default=42.19705782897213)
    lng = models.FloatField('Лат',null=True,blank=True,default=69.95598711561539)
    rural = models.ForeignKey(RuralDistrict, verbose_name='Ауылдық округ', related_name='localities',on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Елді мекен'
        verbose_name_plural = 'Елді мекендер'



class Diametr(models.Model):
    diametr = models.CharField('Диаметр',max_length=255)
    def __str__(self):
        return self.diametr
    
    class Meta:
        verbose_name = 'Диаметр'
        verbose_name_plural = 'Диаметрлер'

class LocalitiesWater(models.Model):

    streetCount = models.IntegerField('Көше саны')
    populationCount = models.IntegerField('Халық саны')
    subscribersCount = models.IntegerField('Абонент саны ')
    springSource = models.CharField('Бұлақ көзі',max_length=255)
    waterDebit = models.CharField('Судың дебеті',max_length=255)
    waterReserves = models.CharField('Жер асты су қоры хаттамасы',max_length=255)
    waterLength = models.CharField('Су құбырының ұзындығы (км)',max_length=255)
    diametress = models.ManyToManyField(Diametr, verbose_name='Диаметры',related_name='localitiesWater')
    yearConstruction = models.IntegerField('Салынған жылы')
    waterStructure = models.CharField('Су құбырының құрылымы',max_length=255)
    newPipes = models.CharField('Жаңартылған құбырлар (км)',max_length=255)
    newYearConstruction = models.IntegerField('Жаңартылған жылы')
    needToUpdate = models.CharField('Жаңартуды қажет ететіні (км) ',max_length=255)
    wateMetersCount = models.IntegerField('Су есептегіш құралдары  (саны)')
    localities = models.OneToOneField(Localities, on_delete=models.CASCADE, verbose_name='Елді мекен',related_name='localitiesWater')

    def __str__(self):

        return f"Су бойынша {self.localities.name} елді мекенінің информациясы"

    class Meta:
        verbose_name = 'Су бойынша'
        verbose_name_plural = 'Су бойынша'

class LocalitiesElectr(models.Model):

    length = models.IntegerField('Электр жүйесінің ұзындығы ')
    cipLength = models.IntegerField('CIP жүйесінің ұзындығы')
    baganaNumber = models.IntegerField('Бағаналардың жалпы саны (дана)')
    bOJT = models.IntegerField('Бағаналар ОЖТ меншігінде')
    aOJT = models.IntegerField('Ағаш ОЖТ меншігінде')
    cipOJT = models.IntegerField('СИП ОЖТ меншігінде')
    tmOJT = models.IntegerField('Темір электр ОЖТ меншігінде')

    bCOM = models.IntegerField('Бағаналар Комуналдық меншік')
    aCOM = models.IntegerField('Ағаш Комуналдық меншік')
    cipCOM = models.IntegerField('СИП Комуналдық меншік')
    tmOCOM = models.IntegerField('Темір электр Комуналдық меншік')

    bOZ = models.IntegerField('Бағаналар Өздері орнатқан ')
    aOZ = models.IntegerField('Ағаш Өздері орнатқан ')
    cipOZ = models.IntegerField('СИП Өздері орнатқан')
    tmOOZ = models.IntegerField('Темір Өздері орнатқан')

    trbaganaNumber = models.IntegerField('Трансформатордағы бағаналардың жалпы саны (дана)')
    trNumber = models.IntegerField('Трансформатор (КТПН)  саны ')
    trCip = models.IntegerField('СИП кабель ВЛ-06 кВт (метр)')
    trVl = models.IntegerField('ВЛ-04 кВт (метр)')

    localities = models.OneToOneField(Localities, on_delete=models.CASCADE, verbose_name='Елді мекен',related_name='localitiesElectr')

    def __str__(self):

        return f"Электр бойынша {self.localities.name} елді мекенінің информациясы"

    class Meta:
        verbose_name = 'Электр бойынша'
        verbose_name_plural = 'Электр бойынша'


class LocalitiesGas(models.Model):
    subscribersCount = models.IntegerField('Абонент саны ')
    gasLength = models.CharField('Газ  құбыры жүйесінің ұзындығы',max_length=255)
    bottomGasLength = models.CharField('Жер асты газ құбырлары (метр)',max_length=255)
    topGasLength = models.CharField('Жер үсті газ құбырлары (метр)', max_length=255)
    typeGas = models.CharField('Құбырлардың құрылымы',max_length=255)
    volumeGas = models.CharField('Газ тұтыну көлемі ',max_length=255)
    grpsh = models.CharField('ГРПШ-6 саны', max_length=255)
    yearConstruction = models.IntegerField('Салынған жылы')
    localities = models.OneToOneField(Localities, on_delete=models.CASCADE, verbose_name='Елді мекен',related_name='localitiesGas')
    def __str__(self):

        return f"Газ бойынша {self.localities.name} елді мекенінің информациясы"

    class Meta:
        verbose_name = 'Газ бойынша'
        verbose_name_plural = 'Газ бойынша'