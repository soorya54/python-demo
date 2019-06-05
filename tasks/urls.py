from django.urls import path
from django.conf.urls import url
from . import views

urlpatterns = [
    path('', views.list, name='list'),
    path('<id>', views.view_task, name='view_task'),
    path('create', views.create, name='create'),
    path('store', views.store, name='store'),
    path('cancel/<id>', views.cancel, name='cancel'),
    # url(r'^$', views.index, name='index'),
    # url(r'^(?P<room_name>[^/]+)/$', views.room, name='room'),
]