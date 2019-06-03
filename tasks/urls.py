from django.urls import path

from . import views

urlpatterns = [
    path('sample', views.sample_job, name='sample_job'),
]