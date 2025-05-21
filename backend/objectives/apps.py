from django.apps import AppConfig

class ObjectivesConfig(AppConfig):
    name = 'objectives'

    def ready(self):
        from django.db.models.signals import post_migrate
        post_migrate.connect(create_periodic_tasks, sender=self)


def create_periodic_tasks(sender, **kwargs):
    from django_celery_beat.models import PeriodicTask, CrontabSchedule
    schedule, _ = CrontabSchedule.objects.get_or_create(
        minute='*',
        hour='*',
        day_of_week='*',
        day_of_month='*',
        month_of_year='*',
    )

    PeriodicTask.objects.update_or_create(
        name='Reset Goals done_today',
        defaults={
            'crontab': schedule,
            'task': 'objectives.tasks.reset_goals_done_today',
        }
    )

    PeriodicTask.objects.update_or_create(
        name='Create DailyGoalStatus if missing',
        defaults={
            'crontab': schedule,
            'task': 'objectives.tasks.create_missing_daily_goal_statuses',
        }
    )

