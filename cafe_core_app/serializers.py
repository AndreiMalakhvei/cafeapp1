from rest_framework import serializers
from .models import Meals, MealClick, MealType
from django.contrib.auth.models import User


class MealTypeSerializer(serializers.ModelSerializer):

    class Meta:
        model = MealType
        fields = "__all__"



class MealsListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Meals
        fields = "__all__"

class AllMealsListSerializer(MealsListSerializer):
    meal_category = serializers.CharField(source='meal_type.category')


class MealBrowseSerializer(MealsListSerializer):
    images = serializers.StringRelatedField(many=True)


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


class CustomClickSerializer(ClickSerializer):
    name = serializers.CharField(source='user__username')
    id = serializers.IntegerField(source='user_id')
