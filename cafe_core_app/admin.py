from django.contrib import admin

from .models import Meals, MealClick, MealImage

admin.site.register(Meals)
admin.site.register(MealClick)
admin.site.register(MealImage)
