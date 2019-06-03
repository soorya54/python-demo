from django.shortcuts import render
from django.http import JsonResponse,HttpResponse
from django.urls import reverse
from rest_framework.decorators import api_view
from rest_framework.test import APIClient
import json
from .tasks import create_random_user_accounts

def index(request):
    return HttpResponse("Hello, world. You're at the tasks index.")

@api_view(['GET', 'POST'])
def sample_job(request):
	data = request.data
	print(data)
	create_random_user_accounts.delay(data)
	result = {}
	result['success'] = True
	status=200
	return JsonResponse(result, status = status)
