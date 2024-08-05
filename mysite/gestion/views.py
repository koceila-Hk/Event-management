from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from .models import Event, Participant
import json

##### class SignUp
@method_decorator(csrf_exempt, name='dispatch')
class SignUpView(View):
    def post(self, request):
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        if not username or not password:
            return JsonResponse({'error': 'Username and password are required'}, status=400)
        
        if User.objects.filter(username=username).exists():
            return JsonResponse({'error': 'Username already exists'}, status=400)
        
        user = User.objects.create_user(username=username, password=password)
        return JsonResponse({'message': 'User created successfully'}, status=201)



@method_decorator(csrf_exempt, name='dispatch')
class SignInView(View):
    def post(self, request):
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        
        if not username or not password:
            return JsonResponse({'error': 'Username and password are required'}, status=400)
        
        user = authenticate(username=username, password=password)
        if user:
            login(request, user)
            print(user.username)
            return JsonResponse({'message': 'User authenticated successfully', 'user':user.username}, status=200)
        
        return JsonResponse({'error': 'Invalid credentials'}, status=400)


class SignOutView(View):
    def get(self, request):
        logout(request)
        return JsonResponse({'message': 'User logged out successfully'}, status=200)

@method_decorator(csrf_exempt, name='dispatch')
class EventCreateView(View):
    def post(self, request):
        if not request.user.is_authenticated:
            return JsonResponse({'error': 'Not authenticated'}, status=403)
        
        data = json.loads(request.body)
        event = Event.objects.create(
            title=data.get('title'),
            description=data.get('description'),
            date=data.get('date'),
            time=data.get('time'),
            location=data.get('location'),
            creator=request.user 
        )
        return JsonResponse({'message': 'Event created successfully'}, status=201)

@method_decorator(csrf_exempt, name='dispatch')
class EventListView(View):
    def get(self):
        
        events = list(Event.objects.values())
        return JsonResponse(events, safe=False)
    


@method_decorator(csrf_exempt, name='dispatch')
class EventDetailView(View):
    def get(self, request, id):
        try:
            event = Event.objects.get(id=id)
            event_data = {
                'id': event.id,
                'title': event.title,
                'description': event.description,
                'date': event.date,
                'time': event.time,
                'location': event.location,
                'creator': event.creator.username 
            }
            return JsonResponse(event_data)
        except Event.DoesNotExist:
            return JsonResponse({'error': 'Event not found'}, status=404)

@method_decorator(csrf_exempt, name='dispatch')
class ParticipantCreateView(View):
    def post(self, request):
        if not request.user.is_authenticated:
            return JsonResponse({'error': 'Not authenticated'}, status=403)

        data = json.loads(request.body)
        event_id = data.get('event')
        
        if not event_id:
            return JsonResponse({'error': 'Event ID is required'}, status=400)

        try:
            event = Event.objects.get(id=event_id)
            participant, created = Participant.objects.get_or_create(user=request.user, event=event)
            if created:
                return JsonResponse({'message': 'Participation successful'}, status=201)
            else:
                return JsonResponse({'message': 'Already participating'}, status=200)
        except Event.DoesNotExist:
            return JsonResponse({'error': 'Event not found'}, status=404)

@method_decorator(csrf_exempt, name='dispatch')
class ParticipantListView(View):
    def get(self, request):
        
        event_id = request.GET.get('event')
        if not event_id:
            return JsonResponse({'error': 'Event ID is required'}, status=400)
        
        try:
            participants = list(Participant.objects.filter(event_id=event_id).values('id', 'user__username'))
            return JsonResponse(participants, safe=False)
        except Event.DoesNotExist:
            return JsonResponse({'error': 'Event not found'}, status=404)



@method_decorator(csrf_exempt, name='dispatch')
class EventUpdateView(View):
    def patch(self, request, id):
        if not request.user.is_authenticated:
            return JsonResponse({'error': 'Not authenticated'}, status=403)

        try:
            event = Event.objects.get(id=id)
        except Event.DoesNotExist:
            return JsonResponse({'error': 'Event not found'}, status=404)

        if event.creator != request.user:
            return JsonResponse({'error': 'Permission denied'}, status=403)

        data = json.loads(request.body)
        event.title = data.get('title', event.title)
        event.description = data.get('description', event.description)
        event.date = data.get('date', event.date)
        event.time = data.get('time', event.time)
        event.location = data.get('location', event.location)
        event.save()
        return JsonResponse({'message': 'Event updated successfully'}, status=200)

@method_decorator(csrf_exempt, name='dispatch')
class EventDeleteView(View):
    def delete(self, request, id):
        if not request.user.is_authenticated:
            return JsonResponse({'error': 'Not authenticated'}, status=403)

        try:
            event = Event.objects.get(id=id)
        except Event.DoesNotExist:
            return JsonResponse({'error': 'Event not found'}, status=404)

        if event.creator != request.user:
            return JsonResponse({'error': 'Permission denied'}, status=403)

        event.delete()
        return JsonResponse({'message': 'Event deleted successfully'}, status=200)
