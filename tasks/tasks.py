import string

from django.contrib.auth.models import User
from django.utils.crypto import get_random_string
from .models import Tasks, TaskStates
from celery import shared_task

@shared_task
def create_tasks(data, user_id):
	task = Tasks(title=data['title'], priority_id=data['priority'], created_by_id=user_id, task_state_id=1)
	task.save()
	task_state = TaskStates(task_id=task.id, task_state_id=task.task_state_id, created_by_id=user_id)
	task_state.save()
	return 'Task has executed successfully'
