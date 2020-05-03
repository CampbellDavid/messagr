from rest_framework import serializers
from .models import MediaMessageGroup
from django.contrib.auth import get_user_model
User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')


class MediaMessageGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = MediaMessageGroup
        fields = '__all__'


class ParticipantsSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'profile_image', 'first_name', 'last_name')


class PopulatedMediaMessageGroupSerializer(MediaMessageGroupSerializer):
    participants = ParticipantsSerializer(many=True)
    owner = UserSerializer()


class PartialMediaMessageGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = MediaMessageGroup
        fields = '__all__'
