from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model=User
        fields=['id','email','username','password']

    def create(self, validated_data):
        user =User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data['email']
        )

        return user
    
class StudyPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model=StudyPlan
        fields='__all__'

class StudySessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = 'StudySession'
        fields = '__all__'

class MoodSerializer(serializers.ModelSerializer):
    class Meta:
        model='Mood'
        fields='__all__'