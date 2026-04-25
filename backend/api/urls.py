from django.urls import path
from . import views

urlpatterns = [
    # Notes Management
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note"),

    # User Management (The Grid & Actions)
    path("users/all/", views.UserListView.as_view(), name="user-list"),
    path("users/detail/<int:userdetails_id>/", views.UserDetailView.as_view(), name="user-detail"),
    path("users/update/<int:userdetails_id>/", views.UserUpdateView.as_view(), name="user-update"),
    path("users/delete/<int:userdetails_id>/", views.UserDeleteView.as_view(), name="user-delete"),
]