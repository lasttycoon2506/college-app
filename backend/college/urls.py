from django.urls import path
from . import views

urlpatterns = [
    path('colleges/', views.getAllColleges, name='colleges'),
    path('colleges/<str:id>/', views.getCollege, name='college')
]