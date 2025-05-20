from django.db import models
from django.contrib.auth.models import User  





class Goal(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    color = models.CharField(max_length=7, default="#FFFFFF")  
    start_time = models.TimeField(null=True, blank=True)  
    end_time = models.TimeField(null=True, blank=True)    

    def __str__(self):
        return f"{self.title} - {self.user.username}"



#insert with submit form or automatically at 00:00 with celery and redis
class DailyGoalStatus(models.Model):
    goal = models.ForeignKey(Goal, on_delete=models.DO_NOTHING, related_name="daily_statuses")
    date = models.DateField()
    completed = models.BooleanField(default=False)

    class Meta:
        unique_together = ('goal', 'date') 

    def __str__(self):
        return f"{self.goal.title} on {self.date}: {'✅' if self.completed else '❌'}"
