from django.contrib.auth.models import User
from rest_framework import serializers
from django.core.exceptions import ValidationError
from .models import Achievement, UserAchievement


class AchievmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievement
        fields = ["name", "description", "points_needed" ,"icon"]


class UserAchievmentSerializer(serializers.ModelSerializer):
    achievement = AchievmentSerializer(read_only=True)
    class Meta:
        model = UserAchievement
        fields = ["user", "achievement", "date_earned"]
        read_only_fields = ["user", "achievment"]

