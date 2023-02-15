from datetime import timedelta
from django.utils import timezone
from cafe_core_app.models import Meals, MealClick
from django.contrib.auth.models import User
import random

def generate_clicks():
    """
    The following func updates MealClick table with 1000 new records
    Run with Shell only
    """
    users_qs = User.objects.prefetch_related().filter(is_staff=False)
    users_ids = list(users_qs.values_list('id', flat=True))
    meals_qs = Meals.objects.prefetch_related()
    meals_ids = list(meals_qs.values_list('id', flat=True))
    now = timezone.now()
    prepared_instances_list = []

    if len(users_ids) == 0 or len(users_ids) == 0:
        raise ValueError('Tables User and/or Meals are not populated')

    for _ in range(2000):
        new_obj = MealClick(
            meal=meals_qs.get(id=random.choice(meals_ids)),
            user=users_qs.get(id=random.choice(users_ids)),
            click_date=now - timedelta(days=random.randrange(42))
            )
        prepared_instances_list.append(new_obj)

    MealClick.objects.bulk_create(prepared_instances_list)
