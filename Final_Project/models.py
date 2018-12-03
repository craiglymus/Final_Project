from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
# Create your models here.

class UserProfileInfo(models.Model):
  user = models.OneToOneField(User,on_delete=models.CASCADE)
  bio = models.TextField(blank=True)
  profile_pic = models.ImageField(upload_to='profile_pics',blank=True)

  def __str__(self):
    return self.user.username

class Gym(models.Model):
  name = models.CharField(max_length=45)
  address = models.TextField()
  phone = models.IntegerField()
  photos = models.ImageField(upload_to=settings.MEDIA_ROOT, blank=True, null=True)
  website = models.URLField(blank=True)
  user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='business')

  def __str__(self):
    return self.user.username

class  Like(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='currentuser')
  gym = models.ForeignKey(Gym, on_delete=models.CASCADE, related_name='gym')

  def __str__(self):
    return self.user.username

class Comment(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user')
  gym = models.ForeignKey(Gym, on_delete=models.CASCADE, related_name='business')

  def __str__(self):
    return self.user.username



