from django.urls import path
from . import views
from django.conf.urls.static import static
from django.conf import settings

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
    path('profile', views.profile_view, name='profile_view'),
    path('like/<int:pk>/delete', views.delete, name='delete'),
    
]

# if settings.DEBUG:
#     urlpatterns += static(settings.MEDIA_URL, document_root=MEDIA_ROOT)