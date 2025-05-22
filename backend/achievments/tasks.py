from celery import shared_task 
from django.contrib.auth.models import User
from .models import Achievement
from users.models import UserPoints
from achievments.models import  UserAchievement


@shared_task
def assign_achievements_based_on_points():
    achievements = Achievement.objects.order_by('points_needed')
    users = User.objects.all()

    for user in users:
        try:
            user_points = UserPoints.objects.get(user=user).points
        except UserPoints.DoesNotExist:
            user_points = 0

        for achievement in achievements:
            if user_points >= achievement.points_needed:
                # Intenta crear solo si no existe
                UserAchievement.objects.get_or_create(
                    user=user,
                    achievement=achievement
                )