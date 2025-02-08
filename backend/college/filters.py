from django_filters import rest_framework as filters
from .models import College

class CollegesFilter(filters.FilterSet):
    class Meta:
        model = College
        fields = ('type', 'division')