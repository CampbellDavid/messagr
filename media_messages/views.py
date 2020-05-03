# pylint: disable=no-member

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND, HTTP_201_CREATED, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_204_NO_CONTENT, HTTP_202_ACCEPTED, HTTP_401_UNAUTHORIZED
from .models import MediaMessage
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .serializers import MediaMessageSerializer, PopulatedMediaMessageSerializer


class MediaMessageListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get(self, request, **kwargs):
        try:
            media_messages = MediaMessage.objects.all()
            serialized_media_messages = MediaMessageSerializer(
                media_messages, many=True)
            return Response(serialized_media_messages.data)
        except MediaMessage.DoesNotExist:
            return Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)

    def post(self, request, **kwargs):
        media_message = MediaMessageSerializer(data=request.data)
        request.data['owner'] = request.user.id
        if media_message.is_valid():
            media_message.save()
            return Response(media_message.data, status=HTTP_201_CREATED)
        return Response(media_message.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)


class MediaMessageDetailView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get(self, request, message_pk, **kwargs):
        try:
            media_message = MediaMessage.objects.get(pk=message_pk)
            serialized_media_message = MediaMessageSerializer(media_message)
            return Response(serialized_media_message.data)
        except MediaMessage.DoesNotExist:
            return Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)

    def delete(self, request, message_pk, **kwargs):
        try:
            media_message = MediaMessage.objects.get(pk=message_pk)
            media_message.delete()
            return Response(status=HTTP_204_NO_CONTENT)
        except MediaMessage.DoesNotExist:
            return Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)
