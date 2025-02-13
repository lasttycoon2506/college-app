from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import College, Applicants
from .serializers import CollegeSerializer
from django.shortcuts import get_object_or_404
from rest_framework import status
from .filters import CollegesFilter
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone



@api_view(['GET'])
def getAllColleges(request):
    collegesFiltered = CollegesFilter(request.GET, queryset=College.objects.all().order_by('id'))
    count = collegesFiltered.qs.count()

    resultsPerPg = 5
    paginator = PageNumberPagination()
    paginator.page_size = resultsPerPg

    paginatedResult = paginator.paginate_queryset(collegesFiltered.qs, request)

    collegesSerialized = CollegeSerializer(paginatedResult, many=True)

    return Response({"count": count, 
                     "colleges": collegesSerialized.data,
                     "resultsPerPg": resultsPerPg
                     })


@api_view(['GET'])
def getCollege(request, id):
    college = get_object_or_404(College, id=id)
    collegeSerialized = CollegeSerializer(college, many=False)

    return Response(collegeSerialized.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addCollege(request):
    data = request.data
    College.objects.create(**data)

    return Response(status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def apply(request, id):
    applicant = request.user
    college = get_object_or_404(College, id)

    hasApplied = college.applicants_set.filter(user=applicant).exists()

    if hasApplied:
        return Response({"error": "already applied"}, status=status.HTTP_400_BAD_REQUEST)
    if not applicant.userprofile.essay:
        return Response({"error": "missing essay"}, status=status.HTTP_400_BAD_REQUEST)
    if not applicant.userprofile.gpa:
        return Response({"error": "missing gpa"}, status=status.HTTP_400_BAD_REQUEST)
    if not applicant.userprofile.sat:
        return Response({"error": "missing sat"}, status=status.HTTP_400_BAD_REQUEST)
    if timezone.now() > college.applicationDeadline:
        return Response({"error": "deadline passed!"}, status=status.HTTP_400_BAD_REQUEST)
    
    collegeApplied = Applicants.objects.create(
        college = college,
        applicant = applicant,
        essay = applicant.userprofile.essay,
        sat = applicant.userprofile.sat,
        gpa = applicant.userprofile.gpa
    )
    
    return Response({'applied': True, 'applicationId': collegeApplied.id}, status=status.HTTP_200_OK)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
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
@permission_classes([IsAuthenticated])
def deleteCollege(request, id):
    collegeToDelete = get_object_or_404(College, id=id)

    collegeToDelete.delete()

    return Response(status=status.HTTP_204_NO_CONTENT)

