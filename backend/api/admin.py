from django.contrib import admin
from .models import UserDetails, Note

# This tells Django to show these tables in the /admin interface
admin.site.register(UserDetails)
admin.site.register(Note)
# Register your models here.
