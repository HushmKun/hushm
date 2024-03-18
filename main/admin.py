from django.contrib import admin
from markdownx.admin import MarkdownxModelAdmin
from .models import Category, News, Project

# Register your models here.


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name'] 


@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = ['title', 'img', 'date', 'desc', 'category']
    prepopulated_fields = {"slug":("title",)}


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['name', 'client', 'img', 'date', 'desc', 'category']
    prepopulated_fields = {"slug":("name",)}
    
