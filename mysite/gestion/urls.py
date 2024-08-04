# urls.py
from django.urls import path
from .views import SignUpView, SignInView, SignOutView, EventCreateView, EventListView, EventDetailView, ParticipantCreateView, ParticipantListView, EventUpdateView, EventDeleteView

urlpatterns = [
    path('signup/', SignUpView.as_view()),
    path('signin/', SignInView.as_view()),
    path('signout/', SignOutView.as_view(), name='sign_out'),
    path('events/new', EventCreateView.as_view(), name='events'),
    path('events/', EventListView.as_view(),),
    path('events/<int:id>/', EventDetailView.as_view(),),
    path('events/<int:id>/update/', EventUpdateView.as_view(), name='event_update'),
    path('events/<int:id>/delete/', EventDeleteView.as_view(), name='event_delete'),
    path('participants/', ParticipantListView.as_view(), name='participant_viewList'),
    path('participant/', ParticipantCreateView.as_view(), name='participant_create'),

]
