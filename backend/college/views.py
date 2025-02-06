from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import College
from .serializers import CollegeSerializer

@api_view(['GET'])
def getAllColleges(request):
    colleges = College.objects.all()

    collegesAsJson = CollegeSerializer(colleges, many=True)

    return Response(collegesAsJson.data)

@api_view(['GET'])
def getCollege(request, id):
    college = College.objects.get(id=id)

    collegeAsJson = CollegeSerializer(college, many=False)

    return Response(collegeAsJson.data)
