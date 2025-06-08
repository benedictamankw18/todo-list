from django import forms
from TaskManager.models import Task

class TaskForm(forms.ModelForm):
    class Meta:
        model = Task
        fields = ['task', 'entry', 'start', 'end', 'desc', 'owner', 'type', 'status']