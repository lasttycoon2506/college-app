from django.contrib.auth.models import User
from rest_framework import serializers


class SignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("firstName", "lastName", "email", "password")

        extra_kwargs = {
            "firstName": {"required": True, "allow_blank": False},
            "lastName": {"required": True, "allow_blank": False},
            "email": {"required": True, "allow_blank": False},
            "password": {"required": True, "allow_blank": False, "min_length": 8}
        }


class UserSerializer(serializers.ModelSerializer):
    essay = serializers.CharField(source="userprofile.essay")
    sat = serializers.IntegerField(source="userprofile.sat")
    gpa = serializers.DecimalField(source="userprofile.gpa", max_digits=4, decimal_places=2)

    class Meta:
        model = User
        fields = ("firstName", "lastName", "email", "username", "essay", "sat", "gpa")