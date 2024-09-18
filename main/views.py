from django.shortcuts import render, HttpResponse, redirect
from json import dumps
from .models import News, Category, Project, Message
from django.views.generic import View
from django.contrib import messages

# Create your views here.

############## Main ##############
class HomeView(View):

    def get(self, request, *args, **kwargs):
        news = News.objects.all()[:3]
        project = Project.objects.all()[:6]
        context = {
            "news":news,
            "projects" : project,
            
        }
        
        return render(request, 'main/index.html', context=context)

    def post(self, request, *args, **kwargs):
        username = request.POST.get("name")
        email = request.POST.get("email")
        message = request.POST.get("message")
        feedback = Message(
                username= username,
                email=email,
                message=message,
        )
        feedback.save()

    

        return render(request, 'main/index.html', context=context)

def index(request):
    news = News.objects.all()[:3]
    project = Project.objects.all()[:6]
    context = {
        "news":news,
        "projects" : project,
    }
    return render(request, 'main/index.html', context=context)

def news(request):
    news = News.objects.all()
    context = {
        "news":news
    }
    return render(request,'main/news_list.html', context)

def news_detail(request, slug):
    news = News.objects.get(slug=slug)
    latest_news = News.objects.all().order_by('-date')[:3]
    categories = Category.objects.all()

    context = {
        "news":news,
        "latest":latest_news,
        "categories":categories
    } 
    return render(request,'main/news_single.html', context)

def projects(request):
    project = Project.objects.all()
    context = {
        "projects":project
    }
    return render(request,'main/project_list.html', context)

def projects_detail(request, slug):
    
    return render(request,'main/project_single.html')

############## APIs ##############

def api_news(request):
    return render(request,'main/project_single.html')

def api_projects(request):
    return render(request,'main/project_single.html')

def more(request):
    return HttpResponse(dumps(test))