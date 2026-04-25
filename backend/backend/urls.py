from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView
from  rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/user/register/", CreateUserView.as_view(), name="register"), # Added /
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),    # Added /
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"), # Added /
    path("api-auth/", include("rest_framework.urls")),
    path("api/", include("api.urls"))
]

