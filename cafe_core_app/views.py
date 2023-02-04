from django.db.models import Count
from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import extend_schema_view, extend_schema, OpenApiResponse, OpenApiParameter
from rest_framework import generics
from rest_framework.exceptions import NotFound
from rest_framework.parsers import MultiPartParser
from rest_framework.permissions import IsAdminUser, AllowAny, IsAuthenticated
from django.contrib.auth.models import User
from rest_framework.response import Response
from .models import Meals, MealClick, MealImage, MealType
from .serializers import MealsListSerializer, MealClickSerializer, UserClickSerializer, CustomClickSerializer, \
    MealBrowseSerializer, MealTypeSerializer, MealsBaseSerializer, ImageUploadSerializer, \
    MealTypeCreateMealSerializer
from .exceptions import BadRequest
from .permissions import IsAdminOrReadOnly


@extend_schema_view(get=extend_schema(summary="Получение списка категорий блюд"))
class MenuAPIView(generics.ListAPIView):
    queryset = MealType.objects.all()
    serializer_class = MealTypeSerializer
    permission_classes = [AllowAny, ]


@extend_schema_view(
    get=extend_schema(
    summary="Получение списка блюд заданной категории",
    responses={
            200: MealsListSerializer,
            404: OpenApiResponse(description='Invalid meal category')
            }
    )
)
class MealsListAPIView(generics.ListAPIView):
    serializer_class = MealsListSerializer
    permission_classes = [AllowAny, ]

    def get_queryset(self):
        if self.kwargs.get('pk', 0):
            queryset = Meals.objects.prefetch_related('images').filter(meal_type=self.kwargs.get('pk'))
            if not queryset:
                raise NotFound(detail='Invalid meal category')
            return queryset
        return Meals.objects.all()


@extend_schema_view(
    get=extend_schema(
    summary="Получение списка всех блюд",
    responses={200: MealsListSerializer,}
    )
)
class AllMealsListAPIView(MealsListAPIView):
    serializer_class = MealsListSerializer
    permission_classes = [AllowAny, ]


@extend_schema_view(
    put=extend_schema(summary="Изменение записи о блюде"),
    patch=extend_schema(summary="Изменение записи о блюде"),
    delete=extend_schema(summary="Удаление записи о блюде")
)
class MealsRetrieveAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Meals.objects.all()
    serializer_class = MealBrowseSerializer
    permission_classes = [IsAdminOrReadOnly, ]

    @extend_schema(summary="Получение детализированной записи о блюде",
                   responses={200: MealBrowseSerializer,
                              404: OpenApiResponse(description='Meal not found')}
                   )
    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            meal_id = self.kwargs['pk']
            try:
                meal = Meals.objects.get(id=meal_id)
                if meal:
                    new_click = MealClick.objects.create(
                            meal=meal,
                            user=User.objects.get(id=request.user.id)
                            )
                    new_click.save()
            except Meals.DoesNotExist:
                raise NotFound(detail='Meal not found')
        return self.retrieve(request, *args, **kwargs)


@extend_schema_view(post=extend_schema(summary="Cоздание новой записи о блюде"))
class AddMealAPIView(generics.CreateAPIView):
    queryset = Meals.objects.all()
    serializer_class = MealsBaseSerializer
    permission_classes = [IsAdminUser, ]

    @extend_schema(
        summary="Получение необходимых данных для создания новой записи о блюде",
        responses={200: MealTypeCreateMealSerializer}
    )
    def get(self, request, *args, **kwargs):
        queryset = MealType.objects.all()
        # return Response(MealTypeCreateMealSerializer(queryset, many=True).data)
        return Response({'category_select': MealTypeSerializer(queryset, many=True).data})


# статистика:
@extend_schema_view(get=extend_schema(summary="Получение списка Top3 блюд по кликам"))
class Top3MealsAPIView(generics.ListAPIView):
    queryset = MealClick.objects.values('meal').annotate(total=Count('meal')).values('meal_id', 'meal__name',
                                                                                     'total').order_by('-total')[:3]
    serializer_class = MealClickSerializer
    permission_classes = (AllowAny,)


@extend_schema_view(get=extend_schema(summary="Получение списка Top10 пользователей по кликам"))
class Top10ActiveUsersAPIView(generics.ListAPIView):
    queryset = MealClick.objects.values('user').annotate(total=Count('user')).values('user_id', 'user__username',
                                                                                     'total').order_by('-total')[:10]
    serializer_class = UserClickSerializer
    permission_classes = (AllowAny,)


class TopCustomCategoryAPIView(generics.ListAPIView):
    serializer_class = CustomClickSerializer
    permission_classes = [AllowAny, ]

    @extend_schema(
        summary="Получение списка TopN пользователей по X категории блюд",
        parameters=[
            OpenApiParameter('limit', OpenApiTypes.INT, description='Количество пользователей'),
            OpenApiParameter('category', OpenApiTypes.INT, description='Категория блюда'),
        ],
        responses={200: CustomClickSerializer,
                   200: MealTypeCreateMealSerializer,
                   404: OpenApiResponse(description='Limit or Category parameter is invalid')}
    )
    def get(self, request, *args, **kwargs):
        if not request.query_params:
            queryset = MealType.objects.all()
            users_count = User.objects.filter(is_superuser=False).count()
            return Response({'category_select': MealTypeSerializer(queryset, many=True).data,
                             'max_number_users': users_count})
        return self.list(request, *args, **kwargs)

    def get_queryset(self):
        if self.request.query_params:
            try:
                limit = int(self.request.query_params.get('limit'))
                category = int(self.request.query_params.get('category'))
            except (ValueError, TypeError):
                raise BadRequest(detail='Limit or Meal Category parameter is invalid')
            else:
                queryset = MealClick.objects.filter(meal__meal_type=category).values('user').annotate(total=Count('user')).values('user_id',
                                                                        'user__username', 'total').order_by('-total')[:limit]
                if queryset.count() == 0:
                    raise BadRequest(detail='Meal Category parameter is invalid')
            return queryset
        return MealClick.objects.none()


@extend_schema_view(post=extend_schema(summary="Загрузка фотографии блюда"))
class ImageUploadAPIView(generics.CreateAPIView):
    queryset = MealImage.objects.all()
    serializer_class = ImageUploadSerializer
    parser_classes = [MultiPartParser,]
    permission_classes = [IsAuthenticated, ]
