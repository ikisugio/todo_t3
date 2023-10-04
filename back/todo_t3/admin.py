from django.contrib import admin
from .models import Todo, CustomUser


class TodoAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Todo._meta.fields]
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ["user_name", "email", "is_superuser", "is_active", "is_staff",
                    "last_login", "date_joined"]

admin.site.register(Todo, TodoAdmin)
admin.site.register(CustomUser, CustomUserAdmin)