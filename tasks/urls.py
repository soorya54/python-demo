from django.urls import path
from django.conf.urls import url
from . import views

urlpatterns = [
    path('sample', views.sample_job, name='sample_job'),
    path('', views.list, name='list'),
    path('create', views.create, name='create'),
    path('store', views.store, name='store'),
    # url(r'^$', views.index, name='index'),
    url(r'^(?P<room_name>[^/]+)/$', views.room, name='room'),
]