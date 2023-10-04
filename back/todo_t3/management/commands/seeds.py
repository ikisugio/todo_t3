from django.core.management.base import BaseCommand
from ...factories import TodoFactory, CustomUserFactory

class Command(BaseCommand):
    help = 'Generate test data for models'

    def add_arguments(self, parser):
        parser.add_argument('model_type', type=str, help='Model type to generate (either "todo", "user" or "superuser")')
        parser.add_argument('total', type=int, help='Indicates the number of records to be created')

    def handle(self, *_, **kwargs):
        model_type = kwargs['model_type']
        total = kwargs['total']

        if model_type == "todo":
            for _ in range(total):
                TodoFactory.create()
            self.stdout.write(self.style.SUCCESS(f'{total} todos were created!'))
        elif model_type == "user":
            for _ in range(total):
                CustomUserFactory.create()
            self.stdout.write(self.style.SUCCESS(f'{total} users were created!'))
        elif model_type == "superuser":
            for _ in range(total):
                CustomUserFactory.create(is_superuser=True)
            self.stdout.write(self.style.SUCCESS(f'{total} superusers were created!'))
        else:
            self.stdout.write(self.style.ERROR('Invalid model type. Use "todo", "user", or "superuser".'))
