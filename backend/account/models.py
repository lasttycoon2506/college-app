from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
    user = models.OneToOneField(User, related_name="userProfile", on_delete=models.CASCADE)
    essay = models.FileField(null=True)
    sat = models.IntegerField(null=True)
    gpa = models.IntegerField(null=True)