from django.shortcuts import render
from django.http import HttpResponse
from django.urls import path
from django.contrib.auth import views as auth_views

# Create your views here.
def login_view(request):
    return render(request, 'login.html')

from django.contrib.auth.views import LoginView

class CustomLoginView(LoginView):
    template_name = 'login.html'

    def form_valid(self, form):
        response = super().form_valid(form)
        if self.request.POST.get('remember'):
            self.request.session.set_expiry(1209600)  # 2 weeks
        else:
            self.request.session.set_expiry(0)  # Session expires on browser close
        return response

    def get_success_url(self):
        return '/'

