from django.db import models
from django.utils.text import slugify
from markdownx.models import MarkdownxField
from django.shortcuts import reverse
from django.utils.translation import gettext_lazy as _

class Category(models.Model):
    name = models.CharField(max_length=30)
    
    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name

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
        return reverse("news_detail", args=[self.slug])

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
        return reverse("Project_detail", args=[slug])

class Message(models.Model):

    name = models.CharField(_("Name"), max_length=50)
    email = models.EmailField(_("Email"), max_length=254)
    message = models.TextField(_("Message"))
    Date = models.DateTimeField(_("Date_Time"), auto_now=False, auto_now_add=True)

    class Meta:
        verbose_name = _("Message")
        verbose_name_plural = _("Messages")

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("Message_detail", kwargs={"pk": self.pk})

