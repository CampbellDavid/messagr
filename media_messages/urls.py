from django.urls import path
from .views import MediaMessageListView, MediaMessageDetailView

urlpatterns = [
    path('', MediaMessageListView.as_view()),
    path('<int:message_pk>', MediaMessageDetailView.as_view())
]
