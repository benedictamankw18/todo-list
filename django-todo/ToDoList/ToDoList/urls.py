"""
URL configuration for ToDoList project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
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
from django.urls import path, include  # Import include to allow URL routing to other apps
from django.contrib.auth.views import LogoutView

urlpatterns = [
    path('admin/', admin.site.urls),
    #path('welcome/', include('Welcome.urls')),
    path('dashboard/', include('Dashboard.urls')),
    path('', include('Welcome.urls')),  # Redirect root URL to welcome page
    # path('login/', include('Login.urls')),
    path('setting/', include('Setting.urls')),
    path('', include('TaskManager.urls')),
    path('', include('Login.urls')),
    path('logout/', LogoutView.as_view(next_page='/login/'), name='logout'),

    # path('', include('TaskManager.urls')),
]
