from django.contrib import admin
from .models import Positions,PolyLine,PolyLineTypes,PolyLineRoad, Relevant,PositionGroup
from model_clone import CloneModelAdmin
# Register your models here.

admin.site.register(Positions)



@admin.register(PolyLine)
class PolyLineAdmin(CloneModelAdmin):
     # Enables/Disables the Duplicate action in the List view (Defaults to True)
    include_duplicate_action = True
    # Enables/Disables the Duplicate action in the Change view (Defaults to True)
    include_duplicate_object_link = True

    list_display = ('id','name','typeMarker','color','localities')
    list_filter = ('localities','typeMarker')
    list_editable = ('typeMarker','color')
    list_display_links = ('name',)
    
    ordering = ('id',)

admin.site.register(PolyLineTypes)





@admin.register(PolyLineRoad)
class PolyLineRoadAdmin(admin.ModelAdmin):


    def polyline_name(self,obj):
        return obj.polyline.name

    list_display = ('id', 'polyline_name','beton','goodSituation','shagal_tas','topirak','badSituation')
    list_display_links =('id','polyline_name')
    list_editable = ('goodSituation','badSituation','shagal_tas','topirak','beton')
    list_filter = ('polyline__localities','polyline__typeMarker')


admin.site.register(Relevant)




@admin.register(PositionGroup)
class PositionGroupAdmin(admin.ModelAdmin):
    list_display = ('id','polyline',)
    list_editable = ('polyline',)
    list_filter = ('polyline__localities','polyline__typeMarker')    
    ordering = ('id',)
