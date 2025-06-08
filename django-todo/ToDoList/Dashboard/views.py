from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from TaskManager.models import Task
from .models import Social
from .forms import TaskForm

@login_required(login_url='/login/')
def dashboard(request):
    tasks = Task.objects.all()  # Or filter by user: Task.objects.filter(owner=request.user.username)
    socials = Social.objects.all()  # If you have a Social model
    last_login = request.user.last_login
    return render(request, 'dashboard.html', {
        'tasks': tasks,
        'socials': socials,
        'last_login': last_login,
    })

def add_task(request):
    if request.method == 'POST':
        form = TaskForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('dashboard')  # or your dashboard view name
    else:
        form = TaskForm()
    return render(request, 'add_task.html', {'form': form})

