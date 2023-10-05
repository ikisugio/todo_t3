from faker import Faker
import factory
from factory.django import DjangoModelFactory
from .models import CustomUser, Todo
import uuid
from django.db.models import QuerySet
import random

faker = Faker('ja_JP')

class RandomOwnerFactory(factory.Factory):
    class Meta:
        model = CustomUser

    @classmethod
    def _create(cls, *args, **kwargs) -> CustomUser:
        # All existing users
        users = CustomUser.objects.all()
        if not users.exists():
            raise ValueError("No existing users to select from.")
        # Randomly select one user
        return random.choice(users)

class CustomUserFactory(DjangoModelFactory):
    class Meta:
        model = CustomUser

    email = factory.LazyAttribute(lambda _: f'{uuid.uuid4()}@example.com')
    user_name = factory.LazyAttribute(lambda _: f'USER_{uuid.uuid4()}')
    password = factory.PostGenerationMethodCall('set_password', 'password')

class TodoFactory(DjangoModelFactory):
    class Meta:
        model = Todo

    title = factory.LazyAttribute(lambda _: faker.sentence())
    content = factory.LazyAttribute(lambda _: faker.text(max_nb_chars=200))
    owner = factory.SubFactory(RandomOwnerFactory)
