from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.auth import get_user_model
User = get_user_model()


class MediaMessageGroup(models.Model):
    group_name = models.CharField(max_length=50)
    description = models.CharField(max_length=300, blank=True)
    owner = models.ForeignKey(
        User, null=True, related_name='media_message_group_owner', on_delete=models.CASCADE)
    participants = models.ManyToManyField(
        'jwt_auth.User', related_name='media_message_group_participants', blank=True)

    def __str__(self):
        return f'Group named {self.group_name} by {self.owner}'

# owner and participants related_name fields correct?
