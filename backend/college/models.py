from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth.models import User


class Types(models.TextChoices):
    Public = "Public"
    Private = "Private"


class Division(models.TextChoices):
    D1 = "D1"
    D2 = "D2"
    D3 = "D3"


class College(models.Model):
    name = models.CharField(max_length=100, null=True)
    address = models.CharField(max_length=100, null=True)
    tuition = models.IntegerField(default=1, validators=[MinValueValidator(1), MaxValueValidator(1000000)])
    type = models.CharField(choices=Types.choices, default=Types.Public,  max_length=10)
    established = models.IntegerField(default=1, validators=[MinValueValidator(1), MaxValueValidator(2025)])
    endowment = models.IntegerField(default=1, validators=[MinValueValidator(1), MaxValueValidator(10000000000000)])
    academicStaff = models.IntegerField(default=1, validators=[MinValueValidator(1), MaxValueValidator(100000)])
    undergrad = models.IntegerField(default=1, validators=[MinValueValidator(1), MaxValueValidator(1000000)])
    postgrad = models.IntegerField(default=1, validators=[MinValueValidator(1), MaxValueValidator(1000000)])
    campusSize = models.IntegerField(default=1, validators=[MinValueValidator(1), MaxValueValidator(1000000)])
    division = models.CharField(choices=Division.choices, default=Division.D1, max_length=10)
    applicationDeadline = models.DateField(null=True)


class Applicants(models.Model):
    college = models.ForeignKey(College, on_delete=models.CASCADE)
    applicant = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    essay = models.CharField(max_length=300)
    sat = models.IntegerField()
    gpa = models.DecimalField(max_digits=4, decimal_places=2)
    dateApplied = models.DateField(auto_now_add=True)