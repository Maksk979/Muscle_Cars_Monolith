
from django.shortcuts import render, redirect
from .forms import CustomUserCreationForm
from django.contrib.auth.decorators import login_required

def index(request):
    return render(request, 'musclecar/index.html')

def gallery(request):
    return render(request, 'musclecar/gallery.html')

def history(request):
    return render(request, 'musclecar/history.html')

def register(request):
    if request.method == "POST":
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('index')
    else:
        form = CustomUserCreationForm()
    return render(request, 'musclecar/register.html', {'form': form})

@login_required
def profile(request):
    return render(request, 'musclecar/profile.html')

