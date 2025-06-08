from django.contrib.auth.models import AbstractUser
from django.db import models

class Login(AbstractUser):
    def __str__(self):
        return self.username
