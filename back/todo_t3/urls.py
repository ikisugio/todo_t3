from django.urls import path
from .views import TodoListView, TodoDetailView, UserRegistrationView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token-obtain-pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    path("todos/", TodoListView.as_view(), name='todo-list'),
    path("todos/<int:pk>/", TodoDetailView.as_view(), name='todo-detail'),
    path("register/", UserRegistrationView.as_view(), name="user-register"),
]