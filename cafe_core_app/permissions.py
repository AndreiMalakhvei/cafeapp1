from rest_framework import permissions

class ReadAnyMarkClicks(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            # if request.user.is_authenticated:
            #     print('Cought authentificated user')

            return True
