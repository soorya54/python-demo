from django.shortcuts import redirect, render
from django.http import JsonResponse,HttpResponse
from django.urls import reverse
from rest_framework.decorators import api_view
from rest_framework.test import APIClient
from django.utils.safestring import mark_safe
import json
from .tasks import create_tasks
from .models import Tasks
from .forms import TaskForm
from django.core import serializers

#code for websockets
def index(request):
	return render(request, 'index.html', {})

def room(request, room_name):
	return render(request, 'room.html', {
		'room_name_json': mark_safe(json.dumps(room_name))
	})



@api_view(['GET', 'POST'])
def list(request):
	# tasks = serializers.serialize("json", Tasks.objects.all())
	if request.user.is_staff:
		tasks = Tasks.objects.all().filter(created_by_id=request.user.id).order_by('-created_at')
	else:
		tasks = Tasks.objects.filter(task_state_id=1).order_by('-priority_id', 'created_at').first()
	print(tasks)
	context = {"name":"soorya"}
	context['is_manager'] = request.user.is_staff
	context['tasks'] = tasks
	return render(request, 'list.html', context)

@api_view(['GET', 'POST'])
def create(request):
	form = TaskForm(request.POST)
	context = {"form":form}
	return render(request, 'create.html', context)

@api_view(['GET', 'POST'])
def store(request):
	if request.method == 'POST':
		post_text = request.data
		# post_text = request.POST.get('the_post')
		response_data = {}
		print(request.data)
		create_tasks.delay(request.data, request.user.id)
		# post = Tasks(title=post_text, created_by_id=request.user.id, )
		# post.save()

		response_data['result'] = 'Create post successful!'
		response_data['status'] = True
		# response_data['postpk'] = post.pk
		# response_data['text'] = post.text
		# response_data['created'] = post.created.strftime('%B %d, %Y %I:%M %p')
		# response_data['author'] = post.author.username

		return redirect('/tasks/')
	else:
		return HttpResponse(
			json.dumps({"nothing to see": "this isn't happening"}),
			content_type="application/json"
		)

@api_view(['GET', 'POST'])
def sample_job(request):
	data = request.data
	print(data)
	# create_random_user_accounts.delay(data)
	result = {}
	result['success'] = True
	status=200
	return JsonResponse(result, status = status)
