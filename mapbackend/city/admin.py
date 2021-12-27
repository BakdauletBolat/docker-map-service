from django.contrib import admin
from .models import RuralDistrict, Localities, Diametr, LocalitiesWater,LocalitiesElectr,LocalitiesGas

# Register your models here.

admin.site.register(RuralDistrict)
admin.site.register(Localities)
admin.site.register(Diametr)
admin.site.register(LocalitiesWater)
admin.site.register(LocalitiesElectr)
admin.site.register(LocalitiesGas)
