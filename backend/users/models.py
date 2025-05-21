from django.db import models
from django.contrib.auth.models import User  
from objectives.models import Goal, DailyGoalStatus
# Create your models here.


class UserPoints(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    points = models.IntegerField(default=0, null=False, blank=False)

    
class FCMToken(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    token = models.TextField()
    device = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.email} - {self.token[:10]}"