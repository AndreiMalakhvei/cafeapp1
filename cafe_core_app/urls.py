from django.urls import path, re_path
from . import views

from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
   openapi.Info(
      title="Snippets API",
      default_version='v1',
      description="Test description",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@snippets.local"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    # Стартовая страница. Список категорий блюд (GET) OK
    path('menu/', views.MenuAPIView.as_view()),
    # Список блюд по выбранной категории (GET)
                                        # add correct ErrorHandling if type_id not found
    path('menu/<int:pk>', views.MealsListAPIView.as_view()),
    # Список всех блюд (GET)
    path('meals/', views.MealsListAPIView.as_view()),
    # Просмотр, изменение, удаление (GET, PUT, DELETE)
    path('meals/<int:pk>', views.MealsRetrieveAPIView.as_view()),
    # Добавление нового блюда в меню (GET, POST)
    path('meals/add', views.MealsAdminOnlyActionsAPIView.as_view()),
    #загрузка нового фото блюда (POST)
    path('meals/upload', views.MenuAPIView.as_view()),
    # Топ 3 блюд по кликам на них авторизованными пользователями (GET)
    path('stat/top3clicked', views.Top3MealsAPIView.as_view()),
    # Топ 10 наиболее активных пользователей по кликам на блюда (GET)
    path('stat/top10active', views.Top10ActiveUsers.as_view()),
    # Топ N пользователей по N категории (GET, POST)
    path('stat/cust', views.TopCustomCategoryAPIView.as_view()),
    # Регистрация нового фото(POST)
    path('user/register', views.MenuAPIView.as_view()),

    # re_path(r"^stat/cust/(?P<limit>\d+)/(?P<category>\d+)", views.TopCustomCategoryAPIView.as_view()),
    # JWT Authentication
    # path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    ]

urlpatterns += [
   re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
   re_path(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
   re_path(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    ]