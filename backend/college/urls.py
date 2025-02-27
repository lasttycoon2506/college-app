from django.urls import path
from . import views

urlpatterns = [
    path('colleges/', views.getAllColleges, name='colleges'),
    path('college/<str:id>/', views.getCollege, name='college'),
    path('colleges/add', views.addCollege, name='add_college'),
    path('colleges/edit/<str:id>/', views.editCollege, name='edit_college'),
    path('colleges/delete/<str:id>/', views.deleteCollege, name='delete_college'),
    path('colleges/apply/<str:id>/', views.applyCollege, name='apply_college'),
    path('currentUser/applications/', views.getCurrUserApplications, name='current_user_applications'),
    path('currentUser/applied/<str:id>/', views.hasApplied, name='current_user_applied')
]