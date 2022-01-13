from django.urls import path
from .views import LocalitiesGasListCreate, LocaltiesElectrListCreate, RuralDistrictList,RuralDistrictById,LocaltiesById,LocalitiesWaterListCreate

urlpatterns = [
    path('rural-list/',RuralDistrictList.as_view(), name='rural-list'),
    path('rural/<int:pk>/',RuralDistrictById.as_view(), name='rural-by-id'),
    path('localties/<int:pk>/',LocaltiesById.as_view(), name='localties-by-id'),
    path('localties-water/',LocalitiesWaterListCreate.as_view()),
    path('localties-gas/',LocalitiesGasListCreate.as_view()),
    path('localties-electr/',LocaltiesElectrListCreate.as_view())
]