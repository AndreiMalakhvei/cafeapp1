from rest_framework.exceptions import APIException

class BadRequest(APIException):
    status_code = 400
    default_detail = 'Wrong request paremeters provided'
    default_code = 'bad_request'