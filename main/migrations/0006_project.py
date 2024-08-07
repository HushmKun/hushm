# Generated by Django 5.0 on 2024-03-15 06:29

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("main", "0005_alter_news_desc"),
    ]

    operations = [
        migrations.CreateModel(
            name="Project",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=100)),
                ("client", models.CharField(max_length=100)),
                ("date", models.DateField()),
                ("desc", models.TextField()),
                ("content", models.TextField()),
                (
                    "slug",
                    models.SlugField(
                        blank=True, default="", editable=False, unique=True
                    ),
                ),
                (
                    "category",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.RESTRICT,
                        related_name="projects",
                        to="main.category",
                    ),
                ),
            ],
            options={
                "verbose_name": "Project",
                "verbose_name_plural": "Projects",
            },
        ),
    ]
