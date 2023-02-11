from django.utils import timezone
from cafe_core_app.models import MealClick


class ReturnChartDict:
    """
        ReturnClass returns data array for building a chart in JS Charts based on MealClick model
    """
    def __init__(self, mid, qty, interval):
        self.mid = mid
        self.qty = qty
        self.interval = interval
        self.dispatcher = {
            "dys": {
                "base_period": timezone.timedelta(days=1),
                "output_format": "%d %b %y",
                   },
            "hrs": {
                "base_period": timezone.timedelta(hours=1),
                "output_format": "%H %a %d"
            },
            "wks": {
                "base_period": timezone.timedelta(weeks=1),
                "output_format": "%W %Y"
            }
        }
        self.base_period = self.dispatcher[interval]["base_period"]
        self.output_format = self.dispatcher[interval]["output_format"]
        self.now = timezone.now()
        self.queryset = MealClick.objects.prefetch_related()

    def get_chart_dict(self):

        start_point = self.now - (self.base_period * (self.qty + 1))
        related_mealclicks = self.queryset.filter(meal_id=self.mid, click_date__gt=start_point)
        keys_list = []

        for y in range(self.qty):
            step_range = self.base_period * y
            time_point = self.now - step_range
            kstr = time_point.strftime(self.output_format)
            keys_list.append(kstr)

        keys_list.reverse()
        final_dict = dict.fromkeys(keys_list, 0)
        print(final_dict)

        for x in related_mealclicks:
            if x.click_date.strftime(self.output_format) in final_dict:
                final_dict[x.click_date.strftime(self.output_format)] =\
                    final_dict.get(x.click_date.strftime(self.output_format), 0) + 1

        # adjust output to JS Recharts:
        recharts_array = [{"name": x, "val": y} for x,y in final_dict.items()]

        return recharts_array
