from django.urls import path
from . import views

urlpatterns=[
  
    path('', views.index, name='index'),

    path('register', views.register, name='register'),
    path('login',views.user_login,name='user_login'),
    path('logout', views.user_logout, name='logout'),

    # path('api/users', views.sendJson, name='sendJson'),
    path('special',views.special, name='special'),
    path('map', views.map, name='map'),
    path('about', views.about, name='about'),
    path('like', views.like, name='like'),
    path('api/likes', views.sendJsonLikes, name='sendJsonLikes'),

]