from django.urls import path 
from .views import (
    UserAchievmentDetailView,
    UserAchievmentListView
)


urlpatterns = [
    path("achievment/<int:id>/", UserAchievmentDetailView.as_view()),
    path("achievments/", UserAchievmentListView.as_view())
]
