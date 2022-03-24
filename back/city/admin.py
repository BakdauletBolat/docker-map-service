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
    list_display = ('id','name','lat','lng','rural')
    list_editable = ('lat','lng')
    list_filter = ('rural',)

admin.site.register(Localities,LocaltiesAdmin)
admin.site.register(Diametr)


@admin.register(LocalitiesWater)
class LocalitesWaterAdmin(admin.ModelAdmin):

    def get_localities_name(self,obj):
        return obj.localities.name

    list_display = ('id','get_localities_name','waterDebit')
    list_editable = ('waterDebit',)
    list_filter = ('localities',)

@admin.register(LocalitiesElectr)
class LocalitesElectrAdmin(admin.ModelAdmin):

    def get_localities_name(self,obj):
        return obj.localities.name

    list_display = ('id','get_localities_name','length','trVl')
    list_editable = ('trVl',)
    list_filter = ('localities',)

@admin.register(LocalitiesGas)
class LocalitesGasAdmin(admin.ModelAdmin):

    def get_localities_name(self,obj):
        return obj.localities.name

    list_display = ('id','get_localities_name','subscribersCount')
    list_filter = ('localities',)
