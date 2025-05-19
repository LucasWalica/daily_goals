from django.shortcuts import render
from rest_framework import generics
from .serializers import DailyGoalStatusSerializer, GoalSerializer
from .models import DailyGoalStatus, Goal
from rest_framework.parsers import JSONParser
from rest_framework.permissions import IsAuthenticated
# Create your views here.



class GoalUserListView(generics.ListAPIView):
    parser_classes =  [JSONParser]
    permission_classes = [IsAuthenticated]
    queryset = Goal.objects.all()
    serializer_class = GoalSerializer

    def get_queryset(self):
        user = self.request.user 
        goals = Goal.objects.filter(user=user)
        return goals

class GoalUpdateView(generics.UpdateAPIView):
    parser_classes =  [JSONParser]
    permission_classes = [IsAuthenticated]
    queryset = Goal.objects.all()
    serializer_class = GoalSerializer
    lookup_field = "id"

class GoalDeleteView(generics.DestroyAPIView):
    parser_classes =  [JSONParser]
    permission_classes = [IsAuthenticated]
    queryset = Goal.objects.all()
    serializer_class = GoalSerializer
    lookup_field = "id"

    def destroy(self, request, *args, **kwargs):
        goal = self.get_object()
        user = request.user
        if goal.user != user:
            raise PermissionDenied("No tienes permido para borrar este objeto")
        return super().destroy(request, *args, **kwargs)

class GoalDetailView(generics.RetrieveAPIView):
    parser_classes =  [JSONParser]
    permission_classes = [IsAuthenticated]
    queryset = Goal.objects.all()
    serializer_class = GoalSerializer
    lookup_field = "id"
    #improve
    def get_queryset(self):
        user = self.request.user 
        achievment = self.get_object
        if user != achievment.user:
            return
        return super().get_queryset()

class CalendarListView(generics.ListAPIView):
    parser_classes =  [JSONParser]
    permission_classes = [IsAuthenticated]
    queryset = DailyGoalStatus.objects.all()
    serializer_class = DailyGoalStatusSerializer

    def get_queryset(self):
        user = self.request.user 
        dailygoals = DailyGoalStatus.objects.filter(user=user)
        return dailygoals
