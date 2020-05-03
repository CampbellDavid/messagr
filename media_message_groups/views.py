# pylint: disable=no-member

from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND, HTTP_201_CREATED, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_204_NO_CONTENT, HTTP_202_ACCEPTED, HTTP_401_UNAUTHORIZED
from .models import MediaMessageGroup
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .serializers import MediaMessageGroupSerializer, ParticipantsSerializer, PopulatedMediaMessageGroupSerializer, PartialMediaMessageGroupSerializer


class MediaMessageGroupListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get(self, _request, pk):
        try:
            media_message_groups = MediaMessageGroup.objects.all()
            serialized_media_message_groups = PopulatedMediaMessageGroupSerializer(
                media_message_groups, many=True)
            return Response(serialized_media_message_groups.data)
        except MediaMessageGroup.DoesNotExist:
            return Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)

    def post(self, request, pk):
        request.data['media_message_group'] = pk
        request.data['owner'] = request.user.id
        media_message_group = MediaMessageGroupSerializer(data=request.data)
        if media_message_group.is_valid():
            media_message_group.save()
            return Response(media_message_group.data, status=HTTP_201_CREATED)
        return Response(media_message_group.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)


class MediaMessageGroupDetailView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get(self, _request, **kwargs):
        try:
            media_message_group = MediaMessageGroup.objects.get(
                pk=kwargs['media_message_group_pk'])
            serialized_media_message_group = PopulatedMediaMessageGroupSerializer(
                media_message_group)
            return Response(serialized_media_message_group.data)
        except MediaMessageGroup.DoesNotExist:
            return Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)

    def put(self, request, pk, **kwargs):
        try:
            media_message_group = MediaMessageGroup.objects.get(
                pk=kwargs['media_message_group_pk'])
            request.data['owner'] = request.user.id
            request.data['media_message'] = pk  # check if necessary
            serialized_media_message_group = PopulatedMediaMessageGroupSerializer(
                media_message_group, data=request.data, partial=True)
            if serialized_media_message_group.is_valid():
                serialized_media_message_group.save()
                updated_media_message_group = MediaMessageGroupSerializer(
                    media_message_group)
                return Response(updated_media_message_group.data, status=HTTP_202_ACCEPTED)
            return Response(updated_media_message_group.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)
        except MediaMessageGroup.DoesNotExist:
            return Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)

    def delete(self, request, **kwargs):
        try:
            media_message_group = MediaMessageGroup.objects.get(
                pk=kwargs['media_message_group_pk'])
            if media_message_group.owner.id != request.user.id:
                return Response(status=HTTP_401_UNAUTHORIZED)
            media_message_group.delete()
            return Response(status=HTTP_204_NO_CONTENT)
        except MediaMessageGroup.DoesNotExist:
            return Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)
