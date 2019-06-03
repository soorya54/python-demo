from django.shortcuts import render
from django.http import JsonResponse,HttpResponse
from rest_framework.decorators import api_view
from django.contrib import auth
import json

@api_view(['GET', 'POST'])
def login(request):
	context = {"name":"soorya"}
	return render(request, 'login/login.html', context)


@api_view(['GET', 'POST'])
def login_api(request):
	data = request.data
	# auth.logout(request)
	# user = request.user
	# user_pass = Users.objects.get(email_id=data['login'])
	# user_pass.set_password(data['password'])
	# user_pass.save()
	# print(user_pass)
	# user = auth.authenticate(email_id=data['login'], password=data['password'])
	# auth.login(request, user)
	# # user = User.objects.get(email=username)
	# print(user)
	print(data)
	result = {}
	result['success'] = True
	status=200
	return HttpResponse(result, content_type="application/json")