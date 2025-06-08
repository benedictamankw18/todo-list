from django.urls import path
from .views import CustomLoginView

urlpatterns = [
    path('login/', CustomLoginView.as_view(), name='login'),
    # path('logout/', auth_views.LogoutView.as_view(next_page='login'), name='logout'),
]