from django.urls import path, include
from . import views
# from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView, Top10ActiveUsers



urlpatterns = [
    # CRUD для модели Meals
    path('meals/', views.MealsListAPIView.as_view()),
    path('meals/<int:pk>', views.MealsRetrieveAPIView.as_view()),
    path('meals/create', views.MealsAdminOnlyActionsAPIView.as_view()),
    path('meals/update/<int:pk>', views.MealsAdminOnlyActionsAPIView.as_view()),
    path('meals/delete/<int:pk>', views.MealsAdminOnlyActionsAPIView.as_view()),
    # Регистрация пользователя

    # JWT Authentication
    # path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    # Топ 3 блюд по кликам на них авторизованными пользователями
    path('meals/stat/top3clicked', views.Top3MealsAPIView.as_view()),
    # Топ 10 наиболее активных пользователей по кликам на блюда
    path('meals/stat/top10active', views.Top10ActiveUsers.as_view()),
    # Топ N пользователей по N категории
    path('meals/stat/topcustom/<int:pk>/<str>', views.MealsAdminOnlyActionsAPIView.as_view()),
    # Для каждого блюда отдельную страничку со статистикой переходов на него (для графика)

    ]