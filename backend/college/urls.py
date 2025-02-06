from django.urls import path
from . import views

urlpatterns = [
    path('colleges/', views.getAllColleges, name='colleges'),
    path('colleges/<str:id>/', views.getCollege, name='college'),
    path('colleges/add', views.addCollege, name='add_college'),
    path('colleges/edit/<str:id>/', views.editCollege, name='edit_college')
]