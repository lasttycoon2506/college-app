from django.db import models
from django.contrib.auth.models import User
from django.dispatch import receiver
from django.db.models.signals import post_save


class UserProfile(models.Model):
    user = models.OneToOneField(User, related_name="userProfile", on_delete=models.CASCADE)
    essay = models.FileField(null=True)
    sat = models.IntegerField(null=True)
    gpa = models.IntegerField(null=True)


@receiver(post_save, sender=User)
def save_profile(sender, instance, created, **kwargs):

    user = instance

    if created:
        profile = UserProfile(user=user)
        profile.save()