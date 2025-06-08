from django.urls import path
from . import views

urlpatterns = [
    path('', views.setting, name='Setting'),
]