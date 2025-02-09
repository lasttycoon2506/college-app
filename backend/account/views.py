from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import status
from backend.account.serializers import SignUpSerializer
from django.contrib.auth.hashers import make_password


@api_view(['POST'])
def register(request):
    data = request.data
    user = SignUpSerializer(data)

    if user.is_valid():
        if not User.objects.filter(username= data["email"]).exists():
            user = User.objects.create(first_name = data["first_name"],
                                          last_name = data["last_name"],
                                          username = data["email"],
                                          email = data["email"],
                                          password = make_password(data["password"])
                                        )
        else:
            return Response({"error": "email already registered"}, status=status.HTTP_200_OK)
    else:
        return Response(user.errors)
