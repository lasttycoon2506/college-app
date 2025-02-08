from django_filters import rest_framework as filters
from .models import College

class CollegesFilter(filters.FilterSet):

    max_tuition = filters.NumberFilter(field_name="tuition" or 1000000, lookup_expr='lte')

    class Meta:
        model = College
        fields = ('type', 'division', 'max_tuition')