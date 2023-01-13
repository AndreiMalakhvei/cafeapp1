from rest_framework import serializers
from .models import Meals, MealClick


class MealsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meals
        fields = "__all__"


class ClickSerializer(serializers.ModelSerializer):
    total = serializers.IntegerField()

    class Meta:
        model = MealClick
        fields = ['id', 'name', 'total']


class MealClickSerializer(ClickSerializer):
    name = serializers.CharField(source='meal__name')
    id = serializers.IntegerField(source='meal_id')


class UserClickSerializer(ClickSerializer):
    name = serializers.CharField(source='user__username')
    id = serializers.IntegerField(source='user_id')


