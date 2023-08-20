from rest_framework.routers import SimpleRouter
from .auth.viewsets import LoginViewSet, CustomerViewSet


routes = SimpleRouter()

# AUTHENTICATION
routes.register(r'auth/login', LoginViewSet, basename='auth-login')
routes.register(r'auth/savecustomer', CustomerViewSet, basename='customer')

# USER
#routes.register(r'customer', CustomerView, basename='customer')


urlpatterns = [
    *routes.urls
]