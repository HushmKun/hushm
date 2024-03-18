from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="home"),
    path("news", views.news, name="news_list"),
    path("news/<slug:slug>", views.news_detail, name="news_detail"),
    path("projects", views.projects, name="project_list"),
    path("projects/<slug:slug>", views.projects_detail, name="project_detail"),

    path("api/news", views.api_news, name="news_api"),   
    path("api/projects", views.api_projects, name="projects_api"),   
    path("more", views.more, name="projects_api"),   
]
