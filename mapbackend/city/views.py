from django.db import models
from django.http.response import JsonResponse
from django.shortcuts import render
from rest_framework.response import Response
from .models import LocalitiesElectr, LocalitiesGas, RuralDistrict, Localities, LocalitiesWater
from .serilizers import (LocalitiesElectrSerilizer, LocalitiesGasSerilizer, LocalitiesRawSerilizer, LocalitiesWaterSerilizer, 
                            RuralDistrictSerilizer, LocalitiesSerilizer,RuralDistrictRawSerilizer)
from rest_framework import generics
# Create your views here.


class RuralDistrictList(generics.ListCreateAPIView):
    queryset = RuralDistrict.objects.all()
    serializer_class = RuralDistrictSerilizer


class RuralDisrictRawList(generics.ListAPIView):
    queryset = RuralDistrict.objects.all()
    serializer_class = RuralDistrictRawSerilizer


class LocalitiesWaterListCreate(generics.ListCreateAPIView):
   queryset = LocalitiesWater.objects.all();
   serializer_class = LocalitiesWaterSerilizer

   def get(self, request):
      fields = LocalitiesWater.filiable_fields(LocalitiesWater)
      return Response(fields)


class LocalitiesGasListCreate(generics.ListCreateAPIView):
    queryset = LocalitiesGas.objects.all();
    serializer_class = LocalitiesGasSerilizer

    def get(self,request):
        fields = LocalitiesGas.filiable_fields(LocalitiesGas)
        return Response(fields)

class LocaltiesElectrListCreate(generics.ListCreateAPIView):
    queryset = LocalitiesElectr.objects.all();
    serializer_class = LocalitiesElectrSerilizer

    def get(self,request):
        fields = LocalitiesElectr.filiable_fields(LocalitiesElectr)
        return Response(fields)


class RuralDistrictById(generics.RetrieveUpdateAPIView):

    serializer_class = RuralDistrictSerilizer

    def get_queryset(self):
        print(self.kwargs['pk'])
        queryset = RuralDistrict.objects.filter(id=self.kwargs['pk'])
        return queryset


class RuralDistrictByRawId(generics.ListAPIView):

    serializer_class = LocalitiesRawSerilizer

    def get_queryset(self):
        print(self.kwargs['pk'])
        queryset = Localities.objects.filter(rural_id=self.kwargs['pk'])
        return queryset


class LocaltiesById(generics.RetrieveUpdateAPIView):

    serializer_class = LocalitiesSerilizer

    def get_queryset(self):
        print(self.kwargs['pk'])
        queryset = Localities.objects.filter(id=self.kwargs['pk'])
        return queryset
