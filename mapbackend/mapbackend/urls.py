from django.contrib import admin
from django.urls import path,include,re_path
from django.shortcuts import render
from django.conf import settings
from django.conf.urls.static import static


def main(request):

    return render(request,'index.html')

urlpatterns = [
    path('',main),
    # re_path(r'^(?:.*)/?$',main),
    path('api/',include('main.urls')),
    path('admin/', admin.site.urls),
]

if settings.DEBUG:
   urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
   urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)