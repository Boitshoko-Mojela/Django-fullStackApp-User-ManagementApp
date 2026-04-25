from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note, UserDetails
from django.db import transaction

class UserSerializer(serializers.ModelSerializer):
    # These fields belong to UserDetails but we accept them here
    first_name = serializers.CharField(write_only=True)
    last_name = serializers.CharField(write_only=True)
    date_of_birth = serializers.DateField(write_only=True)
    province = serializers.CharField(write_only=True)
    gender = serializers.CharField(write_only=True)
    facilitator = serializers.BooleanField(write_only=True)

    class Meta:
        model = User
        fields = [
            "id", "username", "password", "first_name",
            "last_name", "date_of_birth", "province",
            "gender", "facilitator"
        ]
        extra_kwargs = {"password": {"write_only": True}}

    @transaction.atomic
    def create(self, validated_data):
        # 1. Pop out the UserDetails data
        first_name = validated_data.pop('first_name')
        last_name = validated_data.pop('last_name')
        dob = validated_data.pop('date_of_birth')
        prov = validated_data.pop('province')
        gen = validated_data.pop('gender')
        fac = validated_data.pop('facilitator')

        # 2. Create the User (Table 1: auth_user)
        user = User.objects.create_user(**validated_data)

        # 3. Create the UserDetails entry (Table 2: api_userdetails)
        # It uses the 'user' object we just created to establish the link
        UserDetails.objects.create(
            user=user,
            first_name=first_name,
            last_name=last_name,
            date_of_birth=dob,
            province=prov,
            gender=gen,
            facilitator=fac
        )

        return user

class NoteSerializer(serializers.ModelSerializer):
    class Meta: # Fixed 'meta' to 'Meta'
        model = Note
        fields = ["id", "title", "content", "created", "author"]
        extra_kwargs = {"author": {"read_only": True}}

class UserDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDetails
        fields = ['userdetails_id', 'first_name', 'last_name', 'date_of_birth', 'province', 'gender', 'facilitator']