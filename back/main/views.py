import json
from django.views import generic
from .serilizers import PolyLineSerializer,PolylinesTypesSerilizer,RelevantSerializer
from .models import PolyLine,PolyLineTypes, PositionGroup, Positions, Relevant
from rest_framework.response import Response
from django.shortcuts import get_object_or_404, render
from rest_framework import viewsets,permissions
from rest_framework.generics import ListCreateAPIView
from rest_framework.views import APIView
from .serilizers import PolyLineSerializer
# Create your views here.


class PolyLineViewSet(viewsets.ModelViewSet):

    permission_classes = [
        permissions.AllowAny
    ]
    queryset = PolyLine.objects.all()
    serializer_class = PolyLineSerializer


# class ListCreatePolyLine(ListCreateAPIView):

#     serializer_class = PolyLineSerializer
#     queryset = PolyLine.objects.all()

#     def post(self,request):


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



class UpdateAPIViewPolyline(APIView):

    def post(self,request,pk):

        polyline = get_object_or_404(PolyLine,id=pk)


        data = json.loads(request.body)

        for posGroup in polyline.positionGroup.all():
            posGroup.delete()

        for posGroup in data:
            posGroupObject = PositionGroup.objects.create(polyline=polyline)
            for path in posGroup:
                Positions.objects.create(posGroup=posGroupObject, lat=path['lat'], lng=path['lng'])  

        return Response({"json": f'updated {pk}'})


class ListRelevants(APIView):

    def get(self, request, format=None):
        localtiesId = request.GET.get('localtiesId')
        typeId = request.GET.get('typeId')
        polyLines = Relevant.objects.filter(type_id=typeId,localty_id=localtiesId)
        polyS = RelevantSerializer(polyLines,many=True)
        return Response(polyS.data)


