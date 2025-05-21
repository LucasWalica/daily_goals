# goals/tasks.py

from celery import shared_task
from django.utils import timezone
from .models import Goal, DailyGoalStatus
from users.models import FCMToken
from backend.objectives.fcm import send_push_notification


@shared_task
def notify_goal_start_soon(user_id, title, message):
    tokens = FCMToken.objects.filter(user_id=user_id).values_list("token", flat=True)
    if tokens:
        send_push_notification(list(tokens), title, message)


@shared_task
def notify_users_daily_checkin():
    tokens = FCMToken.objects.all().values_list("token", flat=True)
    if tokens:
        send_push_notification(
            list(tokens),
            "How are your goals going?",
            "Check your progress for today!"
        )


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
