# Generated by Django 5.1.7 on 2025-04-24 17:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('musclecar', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('like_count', models.PositiveIntegerField(default=0)),
            ],
        ),
    ]
