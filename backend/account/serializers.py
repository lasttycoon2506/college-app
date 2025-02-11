from django.contrib.auth.models import User
from rest_framework import serializers


class SignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("first_name", "last_name", "email", "password")

        extra_kwargs = {
            "first_name": {"required": True, "allow_blank": False},
            "last_name": {"required": True, "allow_blank": False},
            "email": {"required": True, "allow_blank": False},
            "password": {"required": True, "allow_blank": False, "min_length": 8}
        }


class UserSerializer(serializers.ModelSerializer):
    essay = serializers.CharField(source="userprofile.essay")
    sat = serializers.IntegerField(source="userprofile.sat")
    gpa = serializers.IntegerField(source="userprofile.gpa")

    class Meta:
        model = User
        fields = ("first_name", "last_name", "email", "username", "essay", "sat", "gpa")