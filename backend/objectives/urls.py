from django.urls import path 
from .views import (
    CalendarListView, 
    GoalDeleteView, 
    GoalDetailView, 
    GoalUpdateView, 
    GoalUserListView
    )

urlpatterns = [
    path("calendar/", CalendarListView.as_view()),
    path("goal/<int:id>/", GoalDeleteView.as_view()),
    path("goal/<int:id>/", GoalUpdateView.as_view()),
    path("goal/<int:id>/", GoalDetailView.as_view()),
    path("goal/", GoalUserListView.as_view()),
]
