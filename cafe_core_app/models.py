from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from django.utils import timezone
from django.dispatch import receiver
from django.db.models.signals import pre_delete
from django.core.files.storage import default_storage


class MealType(models.Model):
    category = models.CharField('Категория блюда', max_length=100)

    def __str__(self):
        return self.category


class Meals(models.Model):
    name = models.CharField('Название блюда', max_length=100)
    description = models.TextField('Описание блюда')
    price = models.FloatField('Стоимость блюда')
    size = models.IntegerField('Вес в граммах')
    meal_type = models.ForeignKey(MealType, default='4', on_delete=models.CASCADE, related_name='meal_category')

    def __str__(self):
        return self.name


class MealClick(models.Model):
    meal = models.ForeignKey(Meals, on_delete=models.CASCADE)
    click_date = models.DateTimeField('Дата клика', default=timezone.now)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)


class MealImage(models.Model):
    meal = models.ForeignKey(Meals, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='admin_uploaded_images/')
    date = models.DateTimeField('Дата добавления', blank=True, default=timezone.now)
    ismain = models.BooleanField('Заглавное фото', default=False)

    def __str__(self):
        return self.image.url


@receiver(pre_delete, sender=MealImage)
def decrement_category_usage(sender, instance, **kwargs):
    name = instance.image.name
    default_storage.delete(name)
