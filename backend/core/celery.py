# myproject/celery.py

import os
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

app = Celery('core')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()


from celery.schedules import crontab

app.conf.beat_schedule = {
    'reset-goals-every-day': {
        'task': 'objectives.tasks.reset_goals_done_today',
        'schedule': crontab(hour=0, minute=0),
    },
}
