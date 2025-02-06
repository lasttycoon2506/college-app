from django_filters import rest_framework as filter
from .models import College

class CollegesFilter(filter.FilterSet):
    class Meta:
        model = College
        fields = ('type', 'division')