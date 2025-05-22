
from django.db import models
from django.contrib.auth.models import User

class Car(models.Model):
    name = models.CharField(max_length=100)
    year = models.IntegerField()
    description = models.TextField()
    
    def __str__(self):
        return f"{self.name} ({self.year})"

class CarImage(models.Model):
    car = models.ForeignKey(Car, on_delete=models.CASCADE, related_name='images')
    image_url = models.URLField()
    description = models.CharField(max_length=200, blank=True)
    
    def __str__(self):
        return f"Image of {self.car.name}"

class Post(models.Model):
    title = models.CharField(max_length=255)
    like_count = models.PositiveIntegerField(default=0)

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete = models.CASCADE)
    bio = models.TextField(blank=True)

    def __str__(self):
        return self.user.username