from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import College
from .serializers import CollegeSerializer
from django.shortcuts import get_object_or_404
from rest_framework import status
from .filters import CollegesFilter
import sys


@api_view(['GET'])
def getAllColleges(request):
    collegesFiltered = CollegesFilter(request.GET, queryset=College.objects.all().order_by('id'))
    if str(list(collegesFiltered.data.dict().values())) != "['D1']" or str(list(collegesFiltered.data.dict().values())) != "['D2']" or str(list(collegesFiltered.data.dict().values())) != "['D3']": 
        print("chacha")
        sys.stdout.flush()
        return Response("nahnah")
    else:
        collegesSerialized = CollegeSerializer(collegesFiltered.qs, many=True)

        return Response(collegesSerialized.data)


@api_view(['GET'])
def getCollege(request, id):
    college = get_object_or_404(College, id=id)

    collegeSerialized = CollegeSerializer(college, many=False)

    return Response(collegeSerialized.data)


@api_view(['POST'])
def addCollege(request):
    data = request.data
    College.objects.create(**data)

    return Response(status=status.HTTP_201_CREATED)


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

    return Response(status=status.HTTP_200_OK)


@api_view(['DELETE'])
def deleteCollege(request, id):
    collegeToDelete = get_object_or_404(College, id=id)

    collegeToDelete.delete()

    return Response(status=status.HTTP_204_NO_CONTENT)

