from rest_framework.views import exception_handler

def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    exceptionClass = exc.__class__.__name__

    if (exceptionClass) == "AuthenticationFailed":
        response.data = {"error": "incorrect email or pw"}

    return response
    
