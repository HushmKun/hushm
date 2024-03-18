from django.shortcuts import render, HttpResponse
from json import dumps
from .models import News, Category, Project
# Create your views here.
test = {
    "portfolio": [
        {
            "title" : "Osama essam",
            "imgUrl": "/static/img/portfolio/7.jpg",
            "subTitle": "Photography",
            "pageURL": "portfolio-single-7.html"
        },
        {
            "title": "Omar El-Hbrouk",
            "imgUrl": "/static/img/portfolio/8.jpg",
            "subTitle": "Design",
            "pageURL": "portfolio-single-8.html"
        },
        {
            "title": "Hello Project",
            "imgUrl": "/static/img/portfolio/9.jpg",
            "subTitle": "NaN",
            "pageURL": "portfolio-single-8.html"
        }

    ]
}

############## Main ##############

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