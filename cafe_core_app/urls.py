from django.urls import path, include
from . import views
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView

urlpatterns = [
    # Стартовая страница. Список категорий блюд (GET) OK
    path('menu/all', views.MenuAPIView.as_view()),
    # Список блюд по выбранной категории (GET)
    path('menu/<int:pk>', views.MealsListAPIView.as_view()),
    # Список всех блюд (GET) OK
    path('meals/', views.AllMealsListAPIView.as_view()),
    # Просмотр, изменение, удаление (GET, PUT, DELETE)  - пока только GET
    path('meals/<int:pk>', views.MealsRetrieveAPIView.as_view()),
    # Добавление нового блюда в меню (GET, POST)
    path('meals/add', views.AddMealAPIView.as_view()),
    #загрузка нового фото блюда (POST)
    path('meals/photoupload', views.ImageUploadAPIView.as_view()),
    # Топ 3 блюд по кликам на них авторизованными пользователями (GET)
    path('stat/top3clicked', views.Top3MealsAPIView.as_view()),
    # Топ 10 наиболее активных пользователей по кликам на блюда (GET)
    path('stat/top10active', views.Top10ActiveUsersAPIView.as_view()),
    # Топ N пользователей по X категории (GET, GET+params)
    path('stat/cust', views.TopCustomCategoryAPIView.as_view()),
    ]
# DRF-SPECTACULAR
urlpatterns += [
    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    path('schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('schema/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]
# DRF standard Auth, Djoser, SimpleJWT
urlpatterns += [
    path('api-auth/', include('rest_framework.urls')),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
]
