from .serilizers import PolyLineSerializer,PolylinesTypesSerilizer,RelevantSerializer
from .models import PolyLine,PolyLineTypes, Relevant
from rest_framework.response import Response
from django.shortcuts import render
from rest_framework import viewsets,permissions
from rest_framework.views import APIView
from .serilizers import PolyLineSerializer
# Create your views here.


class PolyLineViewSet(viewsets.ModelViewSet):

    permission_classes = [
        permissions.AllowAny
    ]
    queryset = PolyLine.objects.all()
    serializer_class = PolyLineSerializer


class PolyLineTypesViewSet(viewsets.ModelViewSet):

    permission_classes = [
        permissions.AllowAny
    ]
    queryset = PolyLineTypes.objects.all()
    serializer_class = PolylinesTypesSerilizer


class ListPolylines(APIView):

    def get(self, request, format=None):
        localtiesId = request.GET.get('localtiesId')
        typeMarkerId = request.GET.get('typeMarkerId')
        polyLines = PolyLine.objects.filter(typeMarker_id=typeMarkerId,localities_id=localtiesId)
        polyS = PolyLineSerializer(polyLines,many=True)
        return Response(polyS.data)


class ListRelevants(APIView):

    def get(self, request, format=None):
        localtiesId = request.GET.get('localtiesId')
        typeId = request.GET.get('typeId')
        polyLines = Relevant.objects.filter(type_id=typeId,localty_id=localtiesId)
        polyS = RelevantSerializer(polyLines,many=True)
        return Response(polyS.data)


