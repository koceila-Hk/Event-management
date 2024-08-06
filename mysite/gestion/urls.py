# urls.py
from django.urls import path
from .views import SignUp, SignIn, SignOut, EventCreate, EventList, EventDetail, ParticipantCreate, ParticipantList, EventUpdate, EventDelete

urlpatterns = [
    path('signup/', SignUp.as_view()),
    path('signin/', SignIn.as_view()),
    path('signout/', SignOut.as_view(), name='sign_out'),
    path('events/new', EventCreate.as_view(), name='events'),
    path('events/', EventList.as_view(),),
    path('events/<int:id>/', EventDetail.as_view(),),
    path('events/<int:id>/update/', EventUpdate.as_view(), name='event_update'),
    path('events/<int:id>/delete/', EventDelete.as_view(), name='event_delete'),
    path('participants/', ParticipantList.as_view(), name='participant_viewList'),
    path('participant/', ParticipantCreate.as_view(), name='participant_create'),

]
