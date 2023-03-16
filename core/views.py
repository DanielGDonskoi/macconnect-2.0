from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Profile,NewProfile, Post, Comment
from django.contrib.auth.models import User
import uuid
from django.contrib.auth import authenticate
from .serializers import ProfileSerializer,UserSerializer,NewProfileSerializer,PostSerializer,CommentSerializer;
from django.http import HttpResponse, JsonResponse
import datetime
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
# Create your views here.
#CONTROLLERS FOR THE BACK END
def front(request):
    context = { }
    return render(request, "index.html", context)
@api_view(['GET', 'POST'])
def user_list(request):
    if request.method == 'GET':
        data = User.objects.all()

        serializer = UserSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            username=serializer.initial_data['username']
            email=serializer.initial_data['email-address']
            password=serializer.initial_data['password']
            newuser=User.objects.create_user(username=username,email=email,password=password)
            myid= uuid.uuid4()
            print(myid)
            profile = NewProfile(name = username, user = newuser,bio="Add your bio here!",pfp = None,id = myid)
            profile.save()
            return Response(status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(['GET', 'POST'])
def profiles_list(request):
    if request.method == 'GET':
        data = Profile.objects.all()

        serializer = ProfileSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = ProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(['PUT', 'DELETE'])
def profile_detail(request, pk):
    try:
        student = Profile.objects.get(pk=pk)
    except Profile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = ProfileSerializer(student, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        student.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
@api_view(['GET', 'POST'])
def newprofiles_list(request):
    if request.method == 'GET':
        data = NewProfile.objects.all()

        serializer = NewProfileSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)
def authenticate_user(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        print(serializer)
        print(serializer.initial_data)
        if serializer.is_valid():
            usernamereceived=serializer.initial_data['username']
            email=serializer.initial_data['email-address']
            passwordreceived=serializer.initial_data['password']
            print(passwordreceived)
            user = authenticate(username=usernamereceived,password=passwordreceived)
            if user is not None:
                print("The plan worked")
                return Response(status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_404_NOT_FOUND)
@api_view(['GET', 'POST'])
def posts_list(request):
    if request.method == 'GET':
        data = Post.objects.all()
        serializer = PostSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = PostSerializer(data=request.data)
        name = serializer.initial_data['name']
        text = serializer.initial_data['text']
        id = serializer.initial_data['id']
        img = serializer.initial_data['img']
        obj = NewProfile.objects.get(name = serializer.initial_data['posted_by'])
        profileid = serializer.initial_data['profileid']
        print(obj)
        print(serializer.initial_data)
        post = Post(name = name, posted_by = obj,text=text,id=id,img=img,profileid=profileid)
        print(post)
        post.save()
        return Response(status=status.HTTP_201_CREATED)
            
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(['DELETE'])
def posts_detail(request, pk):
    try:
        student = Post.objects.get(pk=pk)
    except Post.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = ProfileSerializer(student, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        student.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
@api_view(['GET'])
def specific_post(request, pk):
    try:
        student = Post.objects.get(pk=pk)
    except Post.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        data = Post.objects.get(pk=pk)
        serializer = PostSerializer(data,context={'request': request})
        return Response(serializer.data)
@api_view(['GET'])
def profile_by_post(request, id):
    try:
        postcheck = Post.objects.get(id=id)
    except Post.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        post = Post.objects.get(id=id)
        profileid = post.profileid
        data = NewProfile.objects.get(id=profileid)
        serializer = NewProfileSerializer(data,context={'request': request})
        return Response(serializer.data)
@api_view(['GET'])
def get_post_comments(request,id):
    try:
        postcheck = Post.objects.get(id=id)
    except Post.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        post = Post.objects.get(id=id)
        postid = post.id
        try:
            data = Comment.objects.filter(postid=postid)
        except Comment.DoesNotExist:
            return HttpResponse(status = 204)
        serializer = CommentSerializer(data,context={'request': request},many=True)
        return Response(serializer.data)
@api_view(['GET'])
def get_matching_profiles(request,name):
    try:
        profilecheck = NewProfile.objects.get(name=name)
    except NewProfile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        data = NewProfile.objects.filter(name=name)
        print(len(data))
        serializer = NewProfileSerializer(data,context={'request':request},many=True)
        return Response(serializer.data)
@api_view(['GET'])
def get_profile_by_id(request,id):
    if request.method == 'GET':
        data = NewProfile.objects.get(id=id)
        serializer = NewProfileSerializer(data,context={'request':request})
        return Response(serializer.data)
@api_view(['POST'])
def create_comment(request):
    if request.method == 'POST':
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)