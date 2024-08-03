# from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Event, Participant
from .serializers import EventSerializer, ParticipantSerializer
from django.shortcuts import render
# from django.views.generic import View

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class ParticipantViewSet(viewsets.ModelViewSet):
    queryset = Participant.objects.all()
    serializer_class = ParticipantSerializer


# class FrontendAppView(View):
#     def get(self, request, *args, **kwargs):
#         return render(request, 'my-react-app/dist/index.html')
