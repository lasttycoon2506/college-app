from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('currentUser/', views.getCurrUser, name='current_user'),
    path('currentUser/edit/', views.editUser, name='edit_user'),
    path('upload/info/', views.uploadInfo, name='upload_info')
]