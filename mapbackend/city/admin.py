from django.contrib import admin
from django.db import models
from .models import RuralDistrict, Localities, Diametr, LocalitiesWater, LocalitiesElectr, LocalitiesGas

# Register your models here.


class LocaltiesInline(admin.TabularInline):
    model = Localities
    


class RuralDistrictAdmin(admin.ModelAdmin):
    inlines = [
        LocaltiesInline,
    ]


admin.site.register(RuralDistrict, RuralDistrictAdmin)


class LocaltiesWaterStackedInline(admin.StackedInline):

    model = LocalitiesWater


class LocaltiesElectrStackedInline(admin.StackedInline):

    model = LocalitiesElectr

class LocalitiesGasStackedInline(admin.StackedInline):

    model = LocalitiesGas


class LocaltiesAdmin(admin.ModelAdmin):
    inlines = (LocaltiesWaterStackedInline,LocaltiesElectrStackedInline,LocalitiesGasStackedInline)

admin.site.register(Localities,LocaltiesAdmin)
admin.site.register(Diametr)
admin.site.register(LocalitiesWater)
admin.site.register(LocalitiesElectr)
admin.site.register(LocalitiesGas)
