from django.db import models
from rest_framework import serializers
from .models import PolyLineRoad, Positions, PolyLine,PolyLineTypes,Relevant,PositionGroup

from . import serilizers

class PositionsSerilizer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    index = serializers.IntegerField(required=False)
    class Meta:
        model = Positions
        fields = ('id', 'lat', 'lng',"index")




class PositionGroupSerializer(serializers.ModelSerializer):

    positions = PositionsSerilizer(many=True)

    class Meta:

        model = PositionGroup
        fields = ('__all__')


class PolyLineASerializer(serializers.ModelSerializer):
    class Meta:
        model = PolyLine
        fields = ('id',)

class PolyLineRoadSerializer(serializers.ModelSerializer):
    
    polyline = PolyLineASerializer(required=False)

    class Meta:
        model = PolyLineRoad
        fields = ('__all__')

class PolyLineSerializer(serializers.ModelSerializer):

    positionGroup = PositionGroupSerializer(many=True)
    road = PolyLineRoadSerializer(required=False)

    class Meta:
        model = PolyLine
        fields = ('__all__')

    def create(self, validated_data):
        positionGroup = validated_data.pop('positionGroup')
        road = validated_data.pop('road')
        polyline = PolyLine.objects.create(**validated_data)

      
        print(road)
        typeMarker = validated_data.get('typeMarker')
        print(typeMarker)
        if typeMarker.id == 1:
            polylineRoad = PolyLineRoad.objects.create(polyline=polyline,
            width=road['width'],
            hectar=road['hectar'],
            beton=road['beton'],
            goodSituation=road['goodSituation'],
            badSituation=road['badSituation'],
            yearConstruction=road['yearConstruction']
            )
        for positions in positionGroup:
            posGroup = PositionGroup.objects.create(polyline=polyline)
            print(positions['positions'])
            for path in positions['positions']:
                Positions.objects.create(posGroup=posGroup, **path)     
        return polyline

    def update(self, instance, validated_data,partial=True):
    
        positions_data = validated_data.pop('positions')
        instance.name = validated_data.get('name', instance.name)
        instance.km = validated_data.get('km', instance.km)
        instance.typeMarker = validated_data.get('typeMarker', instance.typeMarker)
        instance.description = validated_data.get('description', instance.description)
        instance.save()

        for position_data in positions_data:
            item_id = position_data.get('id', None)
            if item_id:
                inv_item = Positions.objects.get(id=item_id, polyline=instance)
                inv_item.index = position_data.get('index', inv_item.index)
                inv_item.lat = position_data.get('lat', inv_item.lat)
                inv_item.lng = position_data.get('lng', inv_item.lng)
                inv_item.save()
            else:
                try:
                    index = position_data.get('index', None)
                    inv_item = Positions.objects.get(index=index, polyline=instance)
                    inv_item.index = position_data.get('index', inv_item.index)
                    inv_item.lat = position_data.get('lat', inv_item.lat)
                    inv_item.lng = position_data.get('lng', inv_item.lng)
                    inv_item.save()
                except:
                    Positions.objects.create(polyline=instance, **position_data)

        return instance




class PolylinesTypesSerilizer(serializers.ModelSerializer):

    polyline = PolyLineSerializer(partial=True,many=True)
    class Meta:
        model = PolyLineTypes
        fields = ('__all__')



class RelevantSerializer(serializers.ModelSerializer):

    class Meta:
        model = Relevant
        fields = ('__all__')