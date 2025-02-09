from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('currentUser/', views.getCurrUser, name='currentUser'),
    path('currentUser/edit/', views.editUser, name='editUser')
]