
from django.shortcuts import render

def index(request):
    return render(request, 'musclecar/index.html')

def gallery(request):
    return render(request, 'musclecar/gallery.html')

def history(request):
    return render(request, 'musclecar/history.html')
