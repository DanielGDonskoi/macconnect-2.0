from .models import Profile,NewProfile,Post,Comment;
from rest_framework import serializers
from django.contrib.auth.models import User

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('pk', 'id', 'user', 'desc')
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')
class NewProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewProfile
        fields = ('pk','user','name','bio','pfp','id')
class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('pk','posted_by','text','img','name','id','posted_at','profileid')
class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('pk','id','postid','profileid','text')