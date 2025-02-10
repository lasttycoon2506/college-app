from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('currentUser/', views.getCurrUser, name='current_user'),
    path('currentUser/edit/', views.editUser, name='edit_user'),
    path('upload/essay/', views.uploadEssay, name='upload_essay')
]