from django.db import models
from django.contrib.auth.models import User  
from objectives.models import Goal, DailyGoalStatus
# Create your models here.


class UserPoints(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    points = models.IntegerField(default=0, null=False, blank=False)

    
