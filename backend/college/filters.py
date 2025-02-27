from django_filters import rest_framework as filters
from .models import College

class CollegesFilter(filters.FilterSet):
    min_tuition = filters.NumberFilter(field_name="tuition" or 1000000, lookup_expr="gte")
    max_tuition = filters.NumberFilter(field_name="tuition" or 1000000, lookup_expr="lte")
    min_undergrad = filters.NumberFilter(field_name="undergrad" or 1000000, lookup_expr="gte")
    max_undergrad = filters.NumberFilter(field_name="undergrad" or 1000000, lookup_expr="lte")
    name = filters.CharFilter(field_name="name", lookup_expr="icontains")
    address = filters.CharFilter(field_name="address", lookup_expr="icontains")

    class Meta:
        model = College
        fields = ("type", "division","min_tuition", "max_tuition", "min_undergrad", "max_undergrad", "name", "address")