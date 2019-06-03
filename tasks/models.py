from django.db import models
from django.contrib.auth.models import User

class PriorityMaster(models.Model):
	priority = models.CharField(max_length=50)
	active_flag = models.SmallIntegerField(default=1)
	created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
	updated_at = models.DateTimeField(auto_now=True, blank=True, null=True)

	def __str__(self):
		return self.priority

class TaskStateMaster(models.Model):
	state = models.CharField(max_length=50)
	active_flag = models.SmallIntegerField(default=1)
	created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
	updated_at = models.DateTimeField(auto_now=True, blank=True, null=True)

class Tasks(models.Model):
	title = models.CharField(max_length=200)
	task_state = models.ForeignKey(TaskStateMaster, on_delete=models.CASCADE)
	priority = models.ForeignKey(PriorityMaster, on_delete=models.CASCADE)
	employee = models.ForeignKey(User, on_delete=models.CASCADE, related_name='+')
	created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='+')
	created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
	updated_at = models.DateTimeField(auto_now=True, blank=True, null=True)
