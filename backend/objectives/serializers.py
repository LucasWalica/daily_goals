from django.contrib.auth.models import User
from rest_framework import serializers
from django.core.exceptions import ValidationError
from .models import DailyGoalStatus, Goal



class GoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goal
        fields = ["id", "user", "title", "description", "color", "start_time", "end_time"]
        read_only_fields = ["id", "user"]
        
    def create(self, validated_data):
        validated_data["user"] = self.context["request"].user
        return super().create(validated_data)

class DailyGoalStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyGoalStatus
        fields = ["goal", "date", "completed"]
        read_only_fields = ["id"]
