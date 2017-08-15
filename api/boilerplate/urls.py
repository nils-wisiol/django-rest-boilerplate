"""boilerplate URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from django.conf.urls.static import static
from django.conf import settings
from rest_framework import routers
from . import views
from django.views.generic import TemplateView
from django.contrib.auth import views as auth_views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)

urlpatterns = [
    url(r'^api/', include(router.urls)),
    url(r'^api/admin/', admin.site.urls),

    url(r'^api/openid/$', TemplateView.as_view(template_name='home.html'), name='home'),
    url(r'^api/openid/accounts/login/$', auth_views.login, { 'template_name': 'login.html' }, name='login'),
    url(r'^api/openid/accounts/logout/$', auth_views.logout, { 'next_page': '/' }, name='logout'),

    url(r'^api/openid/', include('oidc_provider.urls', namespace='oidc_provider')),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
