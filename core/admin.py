from django.contrib import admin
from .models import Profile,Post,FriendOf,Comment,Like, PersonalDM,GroupMessage,NewProfile
# Register your models here.
admin.site.register(Profile)
admin.site.register(Post)
admin.site.register(FriendOf)
admin.site.register(Comment)
admin.site.register(Like)
admin.site.register(PersonalDM)
admin.site.register(GroupMessage)
admin.site.register(NewProfile)