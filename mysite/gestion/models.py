from django.db import models

# Create your models here.
from django.db import models

class Event(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    date = models.DateField()
    time = models.TimeField()
    location = models.CharField(max_length=255)

    def __str__(self):
        return self.title

class Participant(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    event = models.ForeignKey(Event, related_name='participants', on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.name} ({self.email})"
