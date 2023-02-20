from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
import uuid
from datetime import datetime
# Create your models here.

User = get_user_model()
class NewProfile(models.Model):
    name = models.CharField("Name",max_length=20,default="New User")
    id = models.UUIDField(default=uuid.uuid4)
    user = models.OneToOneField(User,on_delete=models.CASCADE,primary_key=True)
    bio = models.TextField(blank=True)
    pfp = models.ImageField(upload_to =None,default = None)
    def __str__(self):
        return self.name
class Profile(models.Model):
    name = models.CharField("Name",max_length=20,default= "New User")
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    desc = models.TextField(blank=True)
    def __str__(self):
        return self.name
class Post(models.Model):
    id = models.UUIDField(default=uuid.uuid4,primary_key=True)
    posted_by = models.ForeignKey(NewProfile,on_delete=models.CASCADE)
    text = models.TextField(blank=True)
    img = models.ImageField(upload_to=None,default = None)
    name = models.CharField("Name",max_length=20,default= "New User")
    posted_at = models.DateTimeField(default = datetime.now())
class FriendOf(models.Model):
    id = models.UUIDField(primary_key=True,default=uuid.uuid4)
    sender = models.ForeignKey(Profile,on_delete=models.CASCADE, related_name='friendship_requests_sent')
    recipient = models.ForeignKey(Profile,on_delete=models.CASCADE, related_name='friendship_requests_received')
class Comment(models.Model):
    id = models.UUIDField(primary_key=True,default=uuid.uuid4)
    #commenterid = models.ForeignKey(Profile,on_delete=models.CASCADE)
    #postid = models.ForeignKey(Post,on_delete=models.CASCADE)
    text = models.TextField(blank=True)
class Like(models.Model):
    postid = models.ForeignKey(Post,primary_key=True,on_delete=models.CASCADE)
    likedby = models.ForeignKey(Profile,on_delete=models.CASCADE)
class PersonalDM(models.Model):
    id = models.UUIDField(primary_key=True,default=uuid.uuid4)
    text = models.TextField(blank=True)
    sender = models.ForeignKey(Profile,on_delete=models.CASCADE, related_name='message_sent')
    recipient = models.ForeignKey(Profile,on_delete=models.CASCADE, related_name='message_received')
class GroupMessage(models.Model):
    id = models.UUIDField(primary_key=True,default=uuid.uuid4)
    text = models.TextField(blank=True)
    sender = models.ForeignKey(Profile,on_delete=models.CASCADE, related_name='group_message')
    groupsent = models.ForeignKey(Group,on_delete=models.CASCADE)