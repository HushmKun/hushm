from django.contrib.sitemaps import Sitemap
from django.urls import reverse
from main.models import News, Project

class ProjectSitemap(Sitemap):
    changefreq = "weekly"
    priority = 1
    protocol = 'https'
 
    def items(self):
        return Project.objects.all()
    
    def lastmod(self, obj):
        return obj.date
    
    def location(self, obj):
        return '/project/%s' % (obj.slug)

class NewsSitemap(Sitemap):
    changefreq = "weekly"
    priority = 0.6
    protocol = 'https'
 
    def items(self):
        return News.objects.all()
    
    def lastmod(self, obj):
        return obj.date
    
    def location(self, obj):
        return '/news/%s' % (obj.slug)

class StaticSitemap(Sitemap):
    changefreq = "daily"
    priority = 0.8
    protocol = 'https'
 
    def items(self):
        return ['home', 'news_list', 'project_list']
 
    def location(self, item):
        return reverse(item)