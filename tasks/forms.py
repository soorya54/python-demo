from django.forms import ModelForm
from .models import Tasks
from django import forms

PRIORITY_CHOICES= [
    ('1', 'Low'),
    ('2', 'Medium'),
    ('3', 'High'),
    ]

class TaskForm(forms.ModelForm):
    class Meta:
        model = Tasks
        # exclude = ['author', 'updated', 'created', ]
        fields = ['title', 'priority']
        widgets = {
            'title': forms.TextInput(attrs={
                'id': 'post-title', 
                'required': True, 
                'placeholder': 'Enter the title',
                'label': 'Task title'
            }),
            'priority_id': forms.Select(attrs={
                'id': 'post-priority_id', 
                'required': True, 
                'placeholder': 'Enter the title',
                'label': 'Select the task priority'
            }),
        }
