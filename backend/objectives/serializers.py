from django.contrib.auth.models import User
from rest_framework import serializers
from django.core.exceptions import ValidationError
from .models import DailyGoalStatus, Goal



class GoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goal
        fields = ["id", "user", "title", "description", "color", "start_time", "end_time", "done_today"]
        read_only_fields = ["id", "user", "done_today"]
        
    def create(self, validated_data):
        validated_data["user"] = self.context["request"].user
        return super().create(validated_data)


class DailyGoalStatusSerializer(serializers.ModelSerializer):
    goal = serializers.PrimaryKeyRelatedField(queryset=Goal.objects.all())
    goal_details = GoalSerializer(source='goal', read_only=True)

    class Meta:
        model = DailyGoalStatus
        fields = ["goal", "goal_details", "date", "completed"]