from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import status
from .serializers import SignUpSerializer, UserSerializer
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.hashers import make_password


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getCurrUser(request):
    currUser = UserSerializer(request.user)

    return Response(currUser.data)


@api_view(["POST"])
def register(request):
    data = request.data
    user = SignUpSerializer(data=data)

    if user.is_valid():
        if not User.objects.filter(username = data["email"]).exists():
            user = User.objects.create(first_name = data["first_name"],
                                          last_name = data["last_name"],
                                          username = data["email"],
                                          email = data["email"],
                                          password = make_password(data["password"])
                                        )
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response({"error": "email already registered"}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({"error": user.errors}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def editUser(request):
    user = request.user
    data = request.data

    if (data["first_name"] is None or data["last_name"] is None or data["email"] is None or data["username"] is None
        or data["essay"] is None or data["gpa"] is None or data["sat"] is None):
            return Response({"error": "missing field(s)"}, status=status.HTTP_400_BAD_REQUEST)
    
    user.first_name = data["first_name"]
    user.last_name = data["last_name"]
    user.email = data["email"]
    user.username = data["username"]

    if len(data["password"]) != 0:
        user.password = make_password(data["password"])

    user.userprofile.essay = data["essay"]
    user.userprofile.gpa = data["gpa"]
    user.userprofile.sat = data["sat"]

    user.userprofile.save()
    user.save()


    return Response(status=status.HTTP_200_OK)
