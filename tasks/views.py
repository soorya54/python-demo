from django.shortcuts import render
from django.http import JsonResponse,HttpResponse
from django.urls import reverse
from rest_framework.decorators import api_view
from rest_framework.test import APIClient
import json
from .tasks import create_random_user_accounts
from .models import Tasks
from .forms import TaskForm

def index(request):
    return HttpResponse("Hello, world. You're at the tasks index.")

@api_view(['GET', 'POST'])
def list(request):
	context = {"name":"soorya"}
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
		print(post_text['title'])
		# post = Tasks(title=post_text, created_by_id=request.user.id, )
		# post.save()

		response_data['result'] = 'Create post successful!'
		response_data['status'] = True
		# response_data['postpk'] = post.pk
		# response_data['text'] = post.text
		# response_data['created'] = post.created.strftime('%B %d, %Y %I:%M %p')
		# response_data['author'] = post.author.username

		return HttpResponse(
			json.dumps(response_data),
			content_type="application/json"
		)
	else:
		return HttpResponse(
			json.dumps({"nothing to see": "this isn't happening"}),
			content_type="application/json"
		)

@api_view(['GET', 'POST'])
def sample_job(request):
	data = request.data
	print(data)
	create_random_user_accounts.delay(data)
	result = {}
	result['success'] = True
	status=200
	return JsonResponse(result, status = status)
