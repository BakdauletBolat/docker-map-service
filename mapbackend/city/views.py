from django.db import models
from django.shortcuts import render
from .models import RuralDistrict, Localities, LocalitiesWater
from .serilizers import RuralDistrictSerilizer,LocalitiesSerilizer
from rest_framework import generics
# Create your views here.

class RuralDistrictList(generics.ListCreateAPIView):
    queryset = RuralDistrict.objects.all() 
    serializer_class = RuralDistrictSerilizer


class RuralDistrictById(generics.RetrieveUpdateAPIView):

   serializer_class = RuralDistrictSerilizer

   def get_queryset(self):
      print(self.kwargs['pk'])
      queryset = RuralDistrict.objects.filter(id=self.kwargs['pk'])
      return queryset

class LocaltiesById(generics.RetrieveUpdateAPIView):

   serializer_class = LocalitiesSerilizer

   def get_queryset(self):
      print(self.kwargs['pk'])
      queryset = Localities.objects.filter(id=self.kwargs['pk'])
      return queryset





