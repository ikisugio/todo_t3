from django.urls import path
from .views import (
    TodoSearchView,
    TodoListView,
    TodoDetailView,
    UserRegistrationView,
)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    path("search/", TodoSearchView.as_view(), name='todo-search'),
    path("todos/", TodoListView.as_view(), name='todo-list'),
    path("todos/<int:pk>/", TodoDetailView.as_view(), name='todo-detail'),
    path("register/", UserRegistrationView.as_view(), name="user-register"),
    path('token/', TokenObtainPairView.as_view(), name='token-obtain-pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
]