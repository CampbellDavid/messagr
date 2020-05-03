from rest_framework import serializers
from .models import MediaMessage
from django.contrib.auth import get_user_model
User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')


class MediaMessageSerializer(serializers.ModelSerializer):

    class Meta:
        model = MediaMessage
        fields = '__all__'


class PopulatedMediaMessageSerializer(MediaMessageSerializer):
    owner = UserSerializer()
