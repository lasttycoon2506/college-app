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

@api_view(['PUT'])
def editCollege(request, id):
    collegeToEdit = get_object_or_404(College, id=id)

    collegeToEdit.academicStaff = request.data['academicStaff']
    collegeToEdit.address = request.data['address']
    collegeToEdit.campusSize = request.data['campuseSize']
    collegeToEdit.division = request.data['division']
    collegeToEdit.endowment = request.data['endowment']
    collegeToEdit.established = request.data['established']
    collegeToEdit.undergrad = request.data['undergrad']
    collegeToEdit.type = request.data['type']
    collegeToEdit.tuition = request.data['tuition']
    collegeToEdit.postgrad = request.data['postgrad']
    collegeToEdit.name = request.data['name']

    collegeToEdit.save()

    collegeToEditSerialized = CollegeSerializer(collegeToEdit, many=False)

    return Response(collegeToEditSerialized)

