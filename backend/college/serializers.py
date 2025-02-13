from rest_framework import serializers
from .models import Applicants, College

class CollegeSerializer(serializers.ModelSerializer):
    class Meta:
        model = College
        fields = '__all__'


class ApplicantsSerializer(serializers.ModelSerializer):
    college = CollegeSerializer()
    
    class Meta:
        model = Applicants
        fields = ('college', 'applicant', 'dateApplied')