from django.db import models
from django.utils.text import slugify
from markdownx.models import MarkdownxField

# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=30)
    
    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name


    def get_absolute_url(self):
        return reverse("category_detail", kwargs={"pk": self.pk})

class News(models.Model):

    title = models.CharField(max_length=40)
    img = models.ImageField(upload_to="news", height_field=None, width_field=None, max_length=None, blank=True)
    date = models.DateField(auto_now=False, auto_now_add=True)  
    desc = models.CharField(max_length=120)
    category = models.ForeignKey(Category, on_delete=models.RESTRICT, related_name="posts")
    content = MarkdownxField()
    slug = models.SlugField(default="", null=False, db_index = True, unique= True, blank=True)

    class Meta:
        verbose_name = "News"
        verbose_name_plural = "News"

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse("news_detail", kwargs={"pk": self.pk})

class Project(models.Model):

    name = models.CharField(max_length=100)
    img = models.ImageField(upload_to="projects", height_field=None, width_field=None, max_length=None, blank=True)
    client = models.CharField(max_length=100)
    date = models.DateField(auto_now=False, auto_now_add=False)
    desc = MarkdownxField()
    category = models.ForeignKey(Category, on_delete=models.RESTRICT, related_name="projects")
    content = MarkdownxField()
    slug = models.SlugField(default="", null=False, db_index = True, unique= True, blank=True)
    

    class Meta:
        verbose_name = "Project"
        verbose_name_plural = "Projects"

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("Project_detail", kwargs={"pk": self.pk})

