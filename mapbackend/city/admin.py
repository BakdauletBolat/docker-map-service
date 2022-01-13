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


class LocaltiesWaterTabularInline(admin.TabularInline):

    model = LocalitiesWater


class LocaltiesAdmin(admin.ModelAdmin):

    inlines = [
        LocaltiesWaterTabularInline
    ]


admin.site.register(Localities,LocaltiesAdmin)
admin.site.register(Diametr)
admin.site.register(LocalitiesWater)
admin.site.register(LocalitiesElectr)
admin.site.register(LocalitiesGas)
