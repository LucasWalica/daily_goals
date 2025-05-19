from django.urls import path 
from .views import LoginView, UserCreateView

urlpatterns = [
    path("login/", LoginView.as_view()),
    path("register/", UserCreateView.as_view())   
]
