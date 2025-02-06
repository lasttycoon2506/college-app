from django.urls import path
from . import views

urlpatterns = [
    path('colleges/', views.getAllColleges, name='colleges')
]