from django.shortcuts import render, redirect
from Final_Project.forms import UserForm, UserProfileInfoForm
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required

def index(request):
  return render(request, 'Final_Project/index.html')

@login_required
def special(request):
  return HttpResponse('You are logged in !')

@login_required
def user_logout(request):
  logout(request)
  return redirect('index')

# Change redirect from special to index for now
def register(request):
  registered = False
  if request.method == 'POST':
    user_form = UserForm(data=request.POST)
    profile_form = UserProfileInfoForm(data=request.POST)
    if user_form.is_valid() and profile_form.is_valid():
      user = user_form.save()
      user.set_password(user.password)
      user.save()
      profile = profile_form.save(commit=False)
      profile.user = user
      if 'profile_pic' in request.FILES:
          profile.profile_pic = request.FILES['profile_pic']
          profile.save()
      registered = True
      login(request, user)
      return redirect('index')
    else:
        print(user_form.errors,profile_form.errors)
  else:
      user_form = UserForm()
      profile_form = UserProfileInfoForm()
  return render(request, 'Final_Project/registration.html', {'user_form':user_form, 'profile_form':profile_form,'registered':registered})

def user_login(request):
  if request.method == 'POST':
    username = request.POST.get('username')
    password = request.POST.get('password')
    user = authenticate(username=username, password=password)
    if user:
      if user.is_active:
        login(request, user)
        return redirect('index')
      else:
        return HttpResponse('Your account was inactive.')
    else:
        pring("Someone tried to login and failed.")
        print(f'They used username: {username} and password: {password}')
        return HttpResponse('Invalid login details given')
  else:
    return render(request, 'Final_Project/login.html', {})

def map(request):
  return render(request, 'Final_Project/map.html')