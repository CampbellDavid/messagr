from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    email = models.CharField(max_length=40, unique=True)
    first_name = models.CharField(max_length=40, blank=True)
    last_name = models.CharField(max_length=40, blank=True)
    profile_image = models.CharField(max_length=500, blank=True)
    contacts = models.ManyToManyField('self', blank=True)
