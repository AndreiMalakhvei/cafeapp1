from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from django.utils import timezone

class MealType(models.Model):
    category = models.CharField('Категория блюда', max_length=100)

    def __str__(self):
        return self.category


class Meals(models.Model):
    name = models.CharField('Название блюда', max_length=100)
    description = models.TextField('Описание блюда')
    price = models.FloatField('Стоимость блюда')
    size = models.IntegerField('Вес в граммах')
    meal_type = models.ForeignKey(MealType, default='4', on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class MealClick(models.Model):
    meal = models.ForeignKey(Meals, on_delete=models.CASCADE)
    click_date = models.DateTimeField('Дата клика', default=timezone.now)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)


class MealImage(models.Model):
    meal = models.ForeignKey(Meals, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='admin_uploaded_images/')
    date = models.DateTimeField(blank=True)
