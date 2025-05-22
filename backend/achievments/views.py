from django.shortcuts import render
from rest_framework import generics
from .serializers import AchievmentSerializer, UserAchievmentSerializer
from .models import Achievement, UserAchievement
from rest_framework.parsers import JSONParser
from rest_framework.permissions import IsAuthenticated
# Create your views here.


class UserAchievmentListView(generics.ListAPIView):
    parser_classes =  [JSONParser]
    permission_classes = [IsAuthenticated]
    queryset = UserAchievement.objects.all()
    serializer_class = UserAchievmentSerializer

    def get_queryset(self):
        user = self.request.user 
        achiements = UserAchievement.objects.filter(user=user).order_by('-achievement__points_needed')
        return achiements
    

class UserAchievmentDetailView(generics.RetrieveAPIView):
    parser_classes =  [JSONParser]
    permission_classes = [IsAuthenticated]
    queryset = UserAchievement.objects.all()
    serializer_class = UserAchievmentSerializer
    lookup_field = "id"
#improve with response status forbiden
    def get_queryset(self):
        user = self.request.user 
        achievment = self.get_object()

        if achievment.user != user:
            return
        return super().get_queryset()

