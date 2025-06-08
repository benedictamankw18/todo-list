from django.shortcuts import render, redirect
from .models import Task
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics
from .serializers import TaskSerializer
from django.contrib.auth.decorators import login_required

# TaskManager/views.py
# This view handles the task management functionality, allowing users to create and view tasks.
@login_required(login_url='/login/')
@csrf_exempt
def task_manager(request):
    if request.method == "POST":
        Task.objects.create(
            task=request.POST.get("task"),
            entry=request.POST.get("entry"),
            start=request.POST.get("start"),
            end=request.POST.get("end"),
            desc=request.POST.get("desc"),
            owner=request.POST.get("owner"),
            type=request.POST.get("type"),
            status=request.POST.get("status"),
        )
        return redirect('task_manager')
    tasks = Task.objects.all()
    return render(request, 'taskManager.html', {'tasks': tasks})

class TaskListCreateAPIView(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

class TaskRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer