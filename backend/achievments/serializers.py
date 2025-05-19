from django.contrib.auth.models import User
from rest_framework import serializers
from django.core.exceptions import ValidationError
from .models import Achievement, UserAchievement


class AchievmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievement
        fields = ["name", "description", "icon"]


class UserAchievmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAchievement
        fields = ["user", "achievment", "date_earned"]
        read_only_fields = ["user", "achievment"]

