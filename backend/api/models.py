from django.db import models
from django.contrib.auth.models import User

class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")

    def __str__(self):
        return self.title


from django.db import models
from django.contrib.auth.models import User


class UserDetails(models.Model):
    # Manually defining the ID to match Instruction 6a exactly
    userdetails_id = models.AutoField(primary_key=True)

    # Manually defining the link to the User's ID (Instruction 6b)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="details")

    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    date_of_birth = models.DateField()
    province = models.CharField(max_length=20)
    gender = models.CharField(max_length=6)
    facilitator = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"