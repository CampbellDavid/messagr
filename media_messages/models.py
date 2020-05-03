from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.auth import get_user_model
User = get_user_model()


class MediaMessage(models.Model):
    content = models.CharField(max_length=1000)
    owner = models.ForeignKey(
        User, related_name='media_messages', null=True, on_delete=models.CASCADE)
    recipient = models.ForeignKey(
        User, related_name='media_messages+', null=False, on_delete=models.CASCADE)
    attachment = models.CharField(max_length=500, blank=True)

    def __str__(self):
        return f'Message from {self.owner} to {self.recipient}'
