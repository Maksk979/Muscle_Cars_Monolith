from django.shortcuts import render
from .models import Car

def index(request):
    """Главная страница"""
    return render(request, 'musclecar/index.html')

def gallery(request):
    """Страница галереи"""
    cars = Car.objects.all()
    return render(request, 'musclecar/gallery.html', {'cars': cars})

def history(request):
    """Страница истории"""
    return render(request, 'musclecar/history.html')