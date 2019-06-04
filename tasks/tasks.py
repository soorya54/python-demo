import string

from django.contrib.auth.models import User
from django.utils.crypto import get_random_string
from .models import Tasks
from celery import shared_task

@shared_task
def create_tasks(data, user_id):
	task = Tasks(title=data['title'], priority_id=data['priority'], created_by_id=user_id, task_state_id=1)
	task.save()
	return 'Task has executed successfully'
