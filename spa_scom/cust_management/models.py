from typing import Any
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, Group

def create_new_customer_id():
    new_id = UserProfile.objects.count() + 1
    return new_id

# Create your models here.
class UserProfileManager(BaseUserManager):
    def register_customer(self, username, password=None, **kwargs):
        if username is None:
            raise TypeError("Username is a mandatory field")
        
        customer = self.model(username=username)
        customer.set_password(password)
        customer.save(using=self._db)

        return customer
    
    def register_superuser(self, username, password):
        if username is None:
            raise TypeError("Username is a mandatory field")
        if password is None:
            raise TypeError("Admins should have password")
        
        customer = self.register_customer(username, password)
        customer.is_superuser = True
        customer.save(using=self._db)

        return customer


class UserProfile(AbstractBaseUser, PermissionsMixin):
    #customer_id = models.IntegerField(db_index=True, unique=True)
    username = models.CharField(db_index=True, max_length=30, unique=True)
    USERNAME_FIELD = 'username'

    objects = UserProfileManager()

    def __str__(self) -> str:
        return f"{self.customer_email}"
    

class Customer(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    customer_email = models.EmailField(db_index=True, max_length=30, unique=True)
    dob = models.DateField()
    age = models.IntegerField()

    REQUIRED_FIELDS = ['customer_email']

    def __str__(self):
        return f"{self.first_name} {self.last_name}"