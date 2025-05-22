from django.db import models
from django.contrib.auth.models import User  



# this class is created by the admin
class Achievement(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    points_needed = models.IntegerField(default=100)
    icon = models.CharField(blank=False, null=False)

class UserAchievement(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    achievement = models.ForeignKey(Achievement, on_delete=models.CASCADE)
    date_earned = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'achievement')
