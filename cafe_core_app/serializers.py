import rest_framework.fields
from django.core.exceptions import ObjectDoesNotExist
from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import extend_schema_field
from rest_framework import serializers
from .models import Meals, MealClick, MealType, MealImage
from django.contrib.auth.models import User


class MealTypeSerializer(serializers.ModelSerializer):

    class Meta:
        model = MealType
        fields = ["id", 'category']


class MealTypeCreateMealSerializer(serializers.Serializer):
    category_select = MealTypeSerializer(many=True, read_only=True)


class ImagesSerializer(serializers.ModelSerializer):
    url = serializers.ImageField(source='image')

    class Meta:
        model = MealImage
        fields = ['id', 'url']


class MealsBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meals
        fields = '__all__'


class MealsListSerializer(MealsBaseSerializer):
    image_url = serializers.SerializerMethodField(required=False)

    class Meta:
        model = Meals
        exclude = ['description']

    @extend_schema_field(rest_framework.fields.URLField)
    def get_image_url(self, obj):
        try:
            img = obj.images.get(meal=obj.id, ismain=True)
            img_val = img.image.url
        except ObjectDoesNotExist:
            img_val = f'No image defined as main for meal {obj.name} '
        return img_val


class AllMealsListSerializer(MealsListSerializer):
    meal_category = serializers.CharField(source='meal_type.category',required=False, read_only=True)


class MealBrowseSerializer(AllMealsListSerializer):
    images = ImagesSerializer(many=True, read_only=True)

    class Meta:
        model = Meals
        fields = ['id', 'name', 'meal_category', 'description', 'images', 'price', 'size', 'meal_type' ]


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


class ImageUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = MealImage
        fields = ['meal', 'image']
