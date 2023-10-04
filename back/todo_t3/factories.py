from faker import Faker
import factory
from factory.django import DjangoModelFactory
from .models import CustomUser, Todo

faker = Faker('ja_JP')

class CustomUserFactory(DjangoModelFactory):
    class Meta:
        model = CustomUser

    email = factory.LazyAttribute(lambda _: faker.email())
    user_name = factory.LazyAttribute(lambda _: faker.name())
    password = factory.PostGenerationMethodCall('set_password', 'password')

class TodoFactory(DjangoModelFactory):
    class Meta:
        model = Todo

    title = factory.LazyAttribute(lambda _: faker.sentence())
    content = factory.LazyAttribute(lambda _: faker.text(max_nb_chars=200))
    owner = factory.SubFactory(CustomUserFactory)
