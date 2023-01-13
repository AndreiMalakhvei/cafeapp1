from django.db.models import Count
from rest_framework import generics, mixins
from rest_framework.permissions import IsAdminUser, AllowAny, IsAuthenticated
from django.contrib.auth.models import User

from .models import Meals, MealClick, MealImage
from .serializers import MealsSerializer, MealClickSerializer, UserClickSerializer


class MealsListAPIView(generics.ListAPIView):
    queryset = Meals.objects.all()
    serializer_class = MealsSerializer
    permission_classes = (AllowAny, )


class MealsRetrieveAPIView(generics.RetrieveAPIView):
    queryset = Meals.objects.all()
    serializer_class = MealsSerializer
    permission_classes = (AllowAny,)


    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.method == 'GET':
            meal_id = self.kwargs['pk']
            try:
                meal = Meals.objects.get(id=meal_id)
                if meal:
                    new_obj = MealClick.objects.create(
                            meal=meal,
                            user=User.objects.get(id=request.user.id)
                            )
                    new_obj.save()
            except Meals.DoesNotExist:
                pass
        return self.retrieve(request, *args, **kwargs)


class MealsAdminOnlyActionsAPIView(generics.UpdateAPIView,
                                   generics.DestroyAPIView,
                                   generics.CreateAPIView):
    queryset = Meals.objects.all()
    serializer_class = MealsSerializer
    permission_classes = (IsAdminUser,)

class Top3MealsAPIView(generics.ListAPIView):
    queryset = MealClick.objects.values('meal').annotate(total=Count('meal')).values('meal_id', 'meal__name',
                                                                                     'total').order_by('-total')[:3]
    serializer_class = MealClickSerializer
    permission_classes = (AllowAny,)


class Top10ActiveUsers(generics.ListAPIView):
    queryset = MealClick.objects.values('user').annotate(total=Count('user')).values('user_id', 'user__username',
                                                                                     'total').order_by('-total')[:10]
    serializer_class = UserClickSerializer
    permission_classes = (AllowAny,)
