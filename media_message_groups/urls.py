from django.urls import path
from .views import MediaMessageGroupListView, MediaMessageGroupDetailView

urlpatterns = [
    path('', MediaMessageGroupListView.as_view()),
    path('<int:pk>', MediaMessageGroupDetailView.as_view()),
]
