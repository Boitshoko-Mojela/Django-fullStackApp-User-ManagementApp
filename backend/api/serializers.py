from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note, UserDetails

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
            # Remove the lines trying to pop 'details'
            user = User.objects.create_user(**validated_data)
            return user

class NoteSerializer(serializers.ModelSerializer):
    class meta:
        model = Note
        fields = ["id", "title", "content", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}

class UserDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDetails
        fields = ['first_name', 'last_name', 'date_of_birth', 'province', 'gender', 'facilitator']

