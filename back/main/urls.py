from django.urls import path,include
from rest_framework import routers
from .views import PolyLineViewSet,PolyLineTypesViewSet,ListPolylines,ListRelevants,UpdateAPIViewPolyline

router = routers.DefaultRouter()
router.register('polyline', PolyLineViewSet, 'polyline')
router.register('polyline-types', PolyLineTypesViewSet, 'polyline-types')

urlpatterns = [
    path('cities/', include('city.urls')),
    path('new-polylines/',ListPolylines.as_view(),name='listpolylines'),
    path('relevants/',ListRelevants.as_view(),name='listrelevants'),
    path('update-pos/<int:pk>/',UpdateAPIViewPolyline.as_view()),
    path('', include(router.urls))
]
