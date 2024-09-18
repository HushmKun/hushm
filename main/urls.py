from django.urls import path
from django.views.generic.base import TemplateView
from . import views

urlpatterns = [
    path("", views.HomeView.as_view(), name="home"),
    path("news", views.news, name="news_list"),
    path("news/<slug:slug>", views.news_detail, name="news_detail"),
    path("projects", views.projects, name="project_list"),
    path("projects/<slug:slug>", views.projects_detail, name="project_detail"),
    path(
        "robots.txt",
        TemplateView.as_view(template_name="robots.txt", content_type="text/plain"),
    ),

]
