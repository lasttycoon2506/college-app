from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class Types(models.TextChoices):
    public = "Public"
    private = "Private"

class Division(models.TextChoices):
    D1 = "D1"
    D2 = "D2"
    D3 = "D3"

class College(models.Model):
    name = models.CharField(max_length=100, null=True)
    address = models.CharField(max_length=100, null=True)
    tuition = models.IntegerField(default=1, validators=[MinValueValidator(1), MaxValueValidator(1000000)])
    type = models.CharField(choices=Types.choices, default=Types.public)
    established = models.IntegerField(default=1, validators=[MinValueValidator(1), MaxValueValidator(2025)])
    endowment = models.IntegerField(default=1, validators=[MinValueValidator(1), MaxValueValidator(10000000000000)])
    academicStaff = models.IntegerField(default=1, validators=[MinValueValidator(1), MaxValueValidator(100000)])
    undergrad = models.IntegerField(default=1, validators=[MinValueValidator(1), MaxValueValidator(1000000)])
    postgrad = models.IntegerField(default=1, validators=[MinValueValidator(1), MaxValueValidator(1000000)])
    campusSize = models.IntegerField(default=1, validators=[MinValueValidator(1), MaxValueValidator(1000000)])
    division = models.CharField(choices=Division.choices, default=Division.D1)