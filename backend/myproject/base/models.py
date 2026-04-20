from django.db import models
import random
from django.contrib.auth.models import User
# Create your models here.

class StudyPlan(models.Model):
    user= models.ForeignKey(User,on_delete=models.CASCADE)
    subject=models.CharField(max_length=100)
    topic=models.CharField(max_length=200)
    deadline=models.DateField()
    is_missed = models.BooleanField(default=False)
    is_completed = models.BooleanField(default=False)
    total_hour=models.IntegerField()
    difficulty = models.CharField(
        max_length=10,
        choices=[('easy','Easy'), ('medium','Medium'), ('hard','Hard')]
    )

    def __str__(self):
        return f"{self.subject} ({self.topic}) - Deadline: {self.deadline}"
    
class StudySession(models.Model):
    user= models.ForeignKey(User,on_delete=models.CASCADE)
    study_plan=models.ForeignKey(StudyPlan,on_delete=models.CASCADE)
    hours_studied=models.FloatField()
    date=models.DateField(auto_now_add=True)

class Mood(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)

    mood=models.CharField(
        max_length=20,
        choices=[
        ('happy','Happy'),
        ('tired','Tired'),
        ('stressed','Stressed'),
        ('motivated','Motivated')
        ]
        )
    date = models.DateField(auto_now_add=True)

class StudyHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    study_plan = models.ForeignKey(StudyPlan, on_delete=models.CASCADE)

    subject = models.CharField(max_length=100)
    topic = models.CharField(max_length=200)

    total_hours = models.FloatField()
    completed_hours = models.FloatField()

    completed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.subject