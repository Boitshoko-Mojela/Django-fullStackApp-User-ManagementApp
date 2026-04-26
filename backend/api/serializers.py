from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note, UserDetails

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # Strictly username and password for the auth_user table
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        # Creates a user without touching the UserDetails table
        user = User.objects.create_user(**validated_data)
        return user

class UserDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDetails
        fields = [
            'userdetails_id',
            'first_name',
            'last_name',
            'date_of_birth',
            'province',
            'gender',
            'facilitator'
        ]

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "title", "content", "created", "author"]
        extra_kwargs = {"author": {"read_only": True}}