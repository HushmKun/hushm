from django.urls import path
from django.views.generic.base import TemplateView
from . import views

urlpatterns = [
    path("", views.index, name="home"),
    path("news", views.news, name="news_list"),
    path("news/<slug:slug>", views.news_detail, name="news_detail"),
    path("projects", views.projects, name="project_list"),
    path("projects/<slug:slug>", views.projects_detail, name="project_detail"),
    path(
        "robots.txt",
        TemplateView.as_view(template_name="robots.txt", content_type="text/plain"),
    ),

    # path("api/news", views.api_news, name="news_api"),   
    # path("api/projects", views.api_projects, name="projects_api"),   
    # path("cv", views.more, name="projects_api"),   
]
