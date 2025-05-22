
from django.urls import path
from django.contrib.auth import views as auth_views
from . import views
from django.contrib import admin


urlpatterns = [
    path('', views.index, name='index'),
    path('gallery/', views.gallery, name='gallery'),
    path('history/', views.history, name='history'),
    path('register/', views.register, name='register'),
    path('login/', auth_views.LoginView.as_view(template_name='musclecar/login.html'), name='login'),
    path('admin/', admin.site.urls),
    path('accounts/profile/', views.profile, name='profile'),
    path('logout/', auth_views.LogoutView.as_view(next_page='/'), name='logout'),
    
]
