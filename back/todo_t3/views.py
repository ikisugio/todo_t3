from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Todo, CustomUser
from .serializers import TodoSerializer, CustomUserSerializer, UserRegistrationSerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.db.models import Q


from django.db.models import Q

class TodoSearchView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        query = request.query_params.get('q', None)

        if not query:
            return Response({"detail": "Query parameter q is required."}, status=status.HTTP_400_BAD_REQUEST)

        search_criteria = Q(title__icontains=query) | Q(content__icontains=query) | Q(owner__user_name__icontains=query)
        
        if request.user.is_superuser:
            todos = Todo.objects.filter(search_criteria)
        else:
            todos = Todo.objects.filter(search_criteria, owner=request.user)

        serializer = TodoSerializer(todos, many=True)
        return Response(serializer.data)



class TodoListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.is_superuser:
            todos = Todo.objects.all()
        else:
            todos = Todo.objects.filter(owner=request.user)
        serializer = TodoSerializer(todos, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TodoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(owner=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TodoDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return Todo.objects.get(pk=pk)
        except Todo.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        todo = self.get_object(pk)
        if request.user != todo.owner and not request.user.is_superuser:
            return Response(status=status.HTTP_403_FORBIDDEN)
        serializer = TodoSerializer(todo)
        return Response(serializer.data)

    def put(self, request, pk):
        todo = self.get_object(pk)
        if request.user != todo.owner and not request.user.is_superuser:
            return Response(status=status.HTTP_403_FORBIDDEN)
        serializer = TodoSerializer(todo, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        todo = self.get_object(pk)
        if request.user != todo.owner and not request.user.is_superuser:
            return Response(status=status.HTTP_403_FORBIDDEN)
        todo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class UserRegistrationView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserRegistrationSerializer