from django.shortcuts import render
from django.http import HttpResponse
from .serializer import *
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .models import *


# Create your views here.


@api_view(['POST'])
def register(request):
    ser_data=RegisterSerializer(data=request.data)
    if ser_data.is_valid():
        ser_data.save()
        return Response({
            'message':"user register succesfully",
            "data":ser_data.data
        })
    return Response(ser_data.errors)


@api_view(['POST'])
def login_(request):
    username=request.data.get('username')
    password=request.data.get('password')

    user= authenticate(username=username,password=password)
    if user :
        refresh=RefreshToken.for_user(user)
        return Response({
            'message':'Login successfully',
            'refresh':str(refresh),
            'access':str(refresh.access_token)
        })
    else:
        return Response({
            'error':"Invalid credentials"
        },status=400)

@api_view(['GET','POST'])
def studyplan(request):
    if request.method =='GET':
        plans=StudyPlan.objects.filter(user=request.user)
        ser_data=StudyPlanSerializer(plans,many=True)
        return Response(ser_data.data)
    
    if request.method=='POST':
        ser_data=StudyPlanSerializer(data=request.data)
        if ser_data.is_valid():
            ser_data.save(user=request.user)
            return Response(ser_data.data)
        return Response(ser_data.errors)
    
@api_view(["POST"])
def add_study_session(request):
    ser_data=StudySessionSerializer(data=request.data)
    if ser_data.is_valid():
        ser_data.save(user=request.user)
        return Response({"message":"study session added"})

    return Response(ser_data.errors)


def progress(request):
    return Response("")


def add_mood(request):
    return Response("")


def recommendation(request):
    return Response("")