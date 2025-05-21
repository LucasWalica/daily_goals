# goals/tasks.py
from celery import shared_task
from django.utils import timezone
from .models import Goal, DailyGoalStatus

@shared_task
def reset_goals_done_today():
    Goal.objects.all().update(done_today=False)


@shared_task
def create_missing_daily_goal_statuses():
    today = timezone.now().date()
    goals = Goal.objects.all()

    for goal in goals:
        already_exists = DailyGoalStatus.objects.filter(goal=goal, date=today).exists()
        if not already_exists:
            DailyGoalStatus.objects.create(goal=goal, date=today, completed=False)
