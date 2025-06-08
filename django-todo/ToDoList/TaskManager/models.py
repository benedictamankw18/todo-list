from django.db import models

# Create your models here.

class Task(models.Model):
    STATUS_CHOICES = [
        ('INCOMPLETE', 'Incomplete'),
        ('COMPLETE', 'Complete'),
    ]
    TYPE_CHOICES = [
        ('PRIVATE', 'Private'),
        ('PUBLIC', 'Public'),
        ('PERSONAL', 'Personal'),
    ]

    task = models.CharField(max_length=255)
    entry = models.DateField()
    start = models.DateField()
    end = models.DateField()
    desc = models.TextField()
    owner = models.CharField(max_length=100)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)

    def __str__(self):
        return self.task
