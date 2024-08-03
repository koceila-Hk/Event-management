from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EventViewSet, ParticipantViewSet

router = DefaultRouter()
router.register(r'events', EventViewSet)
router.register(r'participants', ParticipantViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    # path('', FrontendAppView.as_view()),
]
