from django.urls import path
from .views import SignUpView, SignInView, SignOutView, EventCreateView, EventListView, EventDetailView, ParticipantCreateView, ParticipantListView

urlpatterns = [
    path('signup/', SignUpView.as_view(), name='signup'),
    path('signin/', SignInView.as_view(), name='signin'),
    path('signout/', SignOutView.as_view(), name='signout'),
    path('events/', EventListView.as_view(), name='event_list'),
    path('events/new/', EventCreateView.as_view(), name='event_create'),
    path('events/<int:id>/', EventDetailView.as_view(), name='event_detail'),
    path('participants/', ParticipantCreateView.as_view(), name='participant_create'),
    path('participants/list/', ParticipantListView.as_view(), name='participant_list'),
]
