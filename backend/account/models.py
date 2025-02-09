from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
    user = models.OneToOneField(User, related_name="user_profile", on_delete=models.CASCADE)
    essay = models.FileField()
    sat = models.IntegerField()
    gpa = models.IntegerField()