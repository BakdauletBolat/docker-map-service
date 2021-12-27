from django.urls import path
from .views import RuralDistrictList,RuralDistrictById,LocaltiesById

urlpatterns = [
    path('rural-list/',RuralDistrictList.as_view(), name='rural-list'),
    path('rural/<int:pk>/',RuralDistrictById.as_view(), name='rural-by-id'),
    path('localties/<int:pk>/',LocaltiesById.as_view(), name='localties-by-id')
]