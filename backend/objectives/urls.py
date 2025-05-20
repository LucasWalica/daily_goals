from django.urls import path 
from .views import (
    CalendarListView, 
    GoalDeleteView, 
    GoalDetailView, 
    GoalUpdateView, 
    GoalUserListView,
    PostDailyGoalStatus,
    PostGoalView
    )

urlpatterns = [
    path("calendar/", CalendarListView.as_view()),
    path("goal/daily/", PostDailyGoalStatus.as_view()),
    path("goal/delete/<int:id>/", GoalDeleteView.as_view()),
    path("goal/update/<int:id>/", GoalUpdateView.as_view()),
    path("goal/<int:id>/", GoalDetailView.as_view()),
    path("goal/user/list/", GoalUserListView.as_view()),
    path("goal/", PostGoalView.as_view() )
]
