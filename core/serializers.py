from .models import Profile,NewProfile;
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
        fields = ('pk','user','name','bio','pfp')