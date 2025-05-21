from pyfcm import FCMNotification
from django.conf import settings

push_service = FCMNotification(api_key=settings.FCM_SERVER_KEY)

def send_push_notification(registration_ids, title, message):
    result = push_service.notify_multiple_devices(
        registration_ids=registration_ids,
        message_title=title,
        message_body=message,
    )
    return result
