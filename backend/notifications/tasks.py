from celery import shared_task
from users.models import FCMToken
from notifications.fcm import send_push_notification

@shared_task
def notify_goal_start_soon(user_id, title, message):
    tokens = FCMToken.objects.filter(user_id=user_id).values_list("token", flat=True)
    if tokens:
        send_push_notification(list(tokens), title, message)