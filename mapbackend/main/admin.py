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
    list_filter = ('localities',)
    list_editable = ('typeMarker','color')
    list_display_links = ('name',)
    
    ordering = ('name',)

admin.site.register(PolyLineTypes)
admin.site.register(PolyLineRoad)
admin.site.register(Relevant)
admin.site.register(PositionGroup)