from django.contrib import admin
from .models import Goal, DailyGoalStatus
# Register your models here.

admin.site.register(Goal)
admin.site.register(DailyGoalStatus)
