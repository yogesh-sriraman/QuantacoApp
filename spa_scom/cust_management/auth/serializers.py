from cust_management.serializers import UserProfileSerializer
from cust_management.models import Customer

from django.contrib.auth.models import update_last_login
from django.core.exceptions import ObjectDoesNotExist

from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.settings import api_settings

class LoginSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        refresh =  self.get_token(self.user)

        data['user'] = UserProfileSerializer(self.user).data
        data['refresh'] = str(refresh)
        data["access"] = str(refresh.access_token)

        if api_settings.UPDATE_LAST_LOGIN:
            update_last_login(None, self.user)

        return data
    
class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id',
                  'first_name',
                  'last_name',
                  'customer_email',
                  'dob',
                  'age']

    # def validate(self, attrs):
    #     if self.instance is None:
    #         #New object being created
    #         if Customer.objects.filter(customer_email=attrs['customer_email']).exists():
    #             raise serializers.ValidationError({'customer_email': 'customer_email already exists',})
            
    #     return super().validate(attrs)

