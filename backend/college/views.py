from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import College
from .serializers import CollegeSerializer
from django.shortcuts import get_object_or_404

@api_view(['GET'])
def getAllColleges(request):
    colleges = College.objects.all()

    collegesSerialized = CollegeSerializer(colleges, many=True)

    return Response(collegesSerialized.data)

@api_view(['GET'])
def getCollege(request, id):
    college = get_object_or_404(College, id=id)

    collegeSerialized = CollegeSerializer(college, many=False)

    return Response(collegeSerialized.data)

@api_view(['POST'])
def createCollege(request):
    data = request.data
    newCollege = College.objects.create(**data)

    newCollegeSerialized = CollegeSerializer(newCollege, many=False)

    return Response(newCollegeSerialized.data)

