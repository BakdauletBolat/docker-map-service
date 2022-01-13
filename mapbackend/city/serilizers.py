from rest_framework import serializers
from .models import LocalitiesGas,LocalitiesElectr,RuralDistrict,Localities,LocalitiesWater,Diametr
from main.serilizers import PolyLineSerializer

class DiametrSerilizer(serializers.ModelSerializer):

    class Meta:
        model = Diametr
        fields = ('diametr',)

class LocalitiesWaterSerilizer(serializers.ModelSerializer):

    diametress = DiametrSerilizer(many=True,required=False)
    
    class Meta:
        model = LocalitiesWater
        fields = ('__all__')


class LocalitiesElectrSerilizer(serializers.ModelSerializer):

    class Meta:
        model = LocalitiesElectr
        fields = ('__all__')

class LocalitiesGasSerilizer(serializers.ModelSerializer):

    class Meta:
        model = LocalitiesGas
        fields = ('__all__')



class RuralDistrictASerilizer(serializers.ModelSerializer):
    
    class Meta:
        model = RuralDistrict
        fields = ('__all__')

class LocalitiesSerilizer(serializers.ModelSerializer):

    localitiesWater = LocalitiesWaterSerilizer()
    localitiesElectr = LocalitiesElectrSerilizer()
    localitiesGas = LocalitiesGasSerilizer()
    polylines = PolyLineSerializer(many=True)
    rural = RuralDistrictASerilizer()

    class Meta:
        model = Localities
        fields = ('__all__')


class RuralDistrictSerilizer(serializers.ModelSerializer):

    localities = LocalitiesSerilizer(many=True)

    class Meta:
        model = RuralDistrict
        fields = ('__all__')



