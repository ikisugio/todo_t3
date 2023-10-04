from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import CustomUser, Todo
from rest_framework_simplejwt.tokens import RefreshToken

class UserRegistrationAndAuthenticationTestCase(APITestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(email='test@example.com', password='testpassword')

    def test_user_registration(self):
        data = {
            'email': '111111111111test@example.com',
            'password': 'testpassword2'
        }
        response = self.client.post(reverse('user-register'), data)
        print(f"-------{response.data}-------------")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue('access' in response.data)

    def test_user_authentication(self):
        data = {
            'email': 'test@example.com',
            'password': 'testpassword'
        }
        response = self.client.post(reverse('token-obtain-pair'), data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue('access' in response.data)

class TodoTestCase(APITestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(email='test@example.com', password='testpassword')
        self.todo = Todo.objects.create(title='Test Todo', content='Test Content', owner=self.user)
        refresh = RefreshToken.for_user(self.user)
        self.access_token = str(refresh.access_token)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.access_token}')

    def test_todo_creation(self):
        data = {
            'title': 'New Test Todo',
            'content': 'New Test Content'
        }
        response = self.client.post(reverse('todo-list'), data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Todo.objects.count(), 2)

    def test_todo_retrieval(self):
        response = self.client.get(reverse('todo-detail', args=[self.todo.id]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'Test Todo')

    def test_todo_update(self):
        data = {
            'title': 'Updated Test Todo',
            'content': 'Updated Test Content'
        }
        response = self.client.put(reverse('todo-detail', args=[self.todo.id]), data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.todo.refresh_from_db()
        self.assertEqual(self.todo.title, 'Updated Test Todo')

    def test_todo_deletion(self):
        response = self.client.delete(reverse('todo-detail', args=[self.todo.id]))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Todo.objects.count(), 0)
