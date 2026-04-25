from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, UserDetailsSerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note, UserDetails

# --- USER VIEWS ---

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

# This is the NEW GET request to fetch all users for your ManageUser grid
class UserListView(generics.ListAPIView):
    queryset = UserDetails.objects.all()
    serializer_class = UserDetailsSerializer
    permission_classes = [IsAuthenticated]

# --- NOTE VIEWS ---

class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)

# Detailed view to fetch a single user's info
class UserDetailView(generics.RetrieveAPIView):
    queryset = UserDetails.objects.all()
    serializer_class = UserDetailsSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'userdetails_id' # Using your custom PK

# Update view for first/last name
class UserUpdateView(generics.UpdateAPIView):
    queryset = UserDetails.objects.all()
    serializer_class = UserDetailsSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'userdetails_id'

# Delete view
class UserDeleteView(generics.DestroyAPIView):
    queryset = UserDetails.objects.all()
    serializer_class = UserDetailsSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'userdetails_id'