from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import status
from .serializers import SignUpSerializer, UserSerializer
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.hashers import make_password


@api_view(["POST"])
def register(request):
    data = request.data
    user = SignUpSerializer(data=data)

    if user.is_valid():
        if not User.objects.filter(username= data["email"]).exists():
            user = User.objects.create(first_name = data["first_name"],
                                          last_name = data["last_name"],
                                          username = data["email"],
                                          email = data["email"],
                                          password = make_password(data["password"])
                                        )
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response({"error": "email already registered"}, status=status.HTTP_200_OK)
    else:
        return Response(user.errors)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getCurrUser(request):
    currUser = UserSerializer(request.user)

    return Response(currUser.data)