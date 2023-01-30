"""maconnect URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,re_path,include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework import routers
from core.views import front
from rest_framework import routers
from core import views
router = routers.DefaultRouter()
urlpatterns = [
    path('admin/', admin.site.urls),
    path('',front,name='front'),
    re_path(r'^api/users/$', views.user_list),
    re_path(r'^api/profiles/$', views.profiles_list),
    re_path(r'^api/profiles/(\d{1,9})$', views.profile_detail),
    re_path(r'^api/newprofiles/$', views.newprofiles_list),
    path('signin', views.authenticate_user),
    path('api/token/access/', TokenRefreshView.as_view(), name='token_get_access'),
    path('api/token/both/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/', include(router.urls))
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)