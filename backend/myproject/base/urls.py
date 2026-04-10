from django.urls import path
from .views import *

urlpatterns=[
    path('login/',login_),
    path('register/',register),
    path('studyplan/',studyplan),
    path('session/',add_study_session),
    path('progress/',progress),
    path('mood/',add_mood),
    path('recommendation/',recommendation),
    
]