# Generated by Django 5.0.3 on 2024-03-09 21:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0003_alter_news_slug'),
    ]

    operations = [
        migrations.AddField(
            model_name='news',
            name='desc',
            field=models.CharField(default='Helllo World', max_length=90),
            preserve_default=False,
        ),
    ]
