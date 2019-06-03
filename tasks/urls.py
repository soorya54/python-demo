from django.urls import path

from . import views

urlpatterns = [
    path('sample', views.sample_job, name='sample_job'),
    path('list', views.list, name='list'),
    path('create', views.create, name='create'),
    path('store', views.store, name='store')
]