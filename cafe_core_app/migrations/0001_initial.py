# Generated by Django 4.0.5 on 2023-01-13 07:40

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
from django.utils.timezone import utc


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Meals',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, verbose_name='Название блюда')),
                ('description', models.TextField(verbose_name='Описание блюда')),
                ('price', models.FloatField(verbose_name='Стоимость блюда')),
                ('size', models.IntegerField(verbose_name='Вес в граммах')),
                ('meal_type', models.CharField(choices=[('Горячие блюда', 'Hot Meals'), ('Напитки', 'Drinks'), ('Десерты', 'Desserts'), ('No Type', 'No Type')], default='No Type', max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='MealImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='admin_uploaded_images/')),
                ('url', models.URLField(blank=True)),
                ('date', models.DateTimeField(blank=True)),
                ('meal', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cafe_core_app.meals')),
            ],
        ),
        migrations.CreateModel(
            name='MealClick',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('click_date', models.DateTimeField(default=datetime.datetime(2023, 1, 13, 7, 40, 32, 823887, tzinfo=utc), verbose_name='Дата клика')),
                ('meal', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cafe_core_app.meals')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
