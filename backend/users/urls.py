from django.urls import path 
from .views import LoginView, UserCreateView
from .views import GetUserPoints

urlpatterns = [
    path("login/", LoginView.as_view()),
    path("register/", UserCreateView.as_view()) ,
    path('user/points/', GetUserPoints.as_view(), name='get_user_points'),  
]

