from django.urls import path
from . import views

urlpatterns = [
    path('taskManager/', views.task_manager, name='task_manager'),
    path('api/tasks/', views.TaskListCreateAPIView.as_view(), name='task-list-create'),
    path('api/tasks/<int:pk>/', views.TaskRetrieveUpdateDestroyAPIView.as_view(), name='task-detail'),
]