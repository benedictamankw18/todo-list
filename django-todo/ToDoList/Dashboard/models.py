from django import forms
from django.db import models
from TaskManager.models import Task

# Create your models here.

class Social(models.Model):
    name = models.CharField(max_length=50)
    url = models.URLField()
    icon = models.CharField(max_length=100, blank=True)  # Optional: FontAwesome class or image path

    def __str__(self):
        return self.name
