from django.urls import path
from . import views

urlPatterns = [
    path('colleges/', views.getAllColleges, name='colleges')
]