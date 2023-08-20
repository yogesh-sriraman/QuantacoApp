from .models import UserProfile
from .serializers import UserProfileSerializer

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework import filters

# Create your views here.
class CustomerView(viewsets.ModelViewSet):
    http_method_names = ['get']
    serializer_class = UserProfileSerializer
    permission_classes = (IsAuthenticated,)
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['updated']
    ordering = ['-updated']

    def get_queryset(self):
        if self.request.user.is_superuser:
            return UserProfile.objects.all()
        
    def get_object(self):
        lookup_field_value = self.kwargs[self.lookup_field]

        obj = UserProfile.objects.get(lookup_field_value)
        self.check_object_permissions(self.request, obj)

        return obj