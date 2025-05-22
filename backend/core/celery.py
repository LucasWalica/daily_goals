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

    "create_missing_daily_goal_statuses" : {
        "task":"objectives.tasks.create_missing_daily_goal_statuses",
        "schedule" : crontab(hour=0, minute=0),
    },

    "assign_achievements_based_on_points": {
        "task":"assign_achievements_based_on_points",
        "schedule": crontab(hour=0, minute=0)
    },

    "notify_users_daily_checkin": {
        "task" :"objectives.tasks.notify_users_daily_checkin",
        "schedule" : crontab(hour=16, minute=0),
    },

    'check-goals-starting-soon': {
        'task': 'objectives.tasks.check_goals_starting_soon',
        'schedule': crontab(minute='*/5'),  # every 5 minutes
    },

    
}
