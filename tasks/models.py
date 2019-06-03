from django.db import models


class Users(models.Model):
	name = models.CharField(max_length=200)
	email_id = models.EmailField(max_length=254)
	password = models.TextField()
	is_store_man = models.SmallIntegerField(default=0)
	active_flag = models.SmallIntegerField(default=1)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

class PriorityMaster(models.Model):
	priority = models.CharField(max_length=50)
	active_flag = models.SmallIntegerField(default=1)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

class TaskStateMaster(models.Model):
	state = models.CharField(max_length=50)
	active_flag = models.SmallIntegerField(default=1)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

class Tasks(models.Model):
	title = models.CharField(max_length=200)
	task_state = models.ForeignKey(TaskStateMaster, on_delete=models.CASCADE)
	priority = models.ForeignKey(PriorityMaster, on_delete=models.CASCADE)
	employee = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='+')
	created_by = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='+')
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)