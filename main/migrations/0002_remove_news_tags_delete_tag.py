# Generated by Django 5.0 on 2024-03-07 02:20

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("main", "0001_initial"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="news",
            name="tags",
        ),
        migrations.DeleteModel(
            name="Tag",
        ),
    ]
