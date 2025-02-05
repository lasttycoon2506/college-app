from django.db import models

class Types(models.TextChoices):
    public = "Public"
    private = "Private"

class Division(models.TextChoices):
    D1 = "D1"
    D2 = "D2"
    D3 = "D3"

class College(models.Model):
    name = models.CharField(MaxLength=100, null=True)
    address = models.CharField(max_length=100, null=True)
    tuition = models.IntegerField(max_length=20, null=True)
    type = models.CharField(choices=Types.choices, default=Types.public)
    established = models.IntegerField(max_length=4, null=True)
    endowment = models.IntegerField(max_length=20, null=True)
    academicStaff = models.IntegerField(max_length=10, null=True)
    undergrad = models.IntegerField(max_length=10, null=True)
    postgrad = models.IntegerField(max_length=10, null=True)
    campusSize = models.IntegerField(max_length=10, null=True)
    division = models.CharField(choices=Division.choices, default=Division.D1)