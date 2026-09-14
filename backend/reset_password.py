import os
import django
import sys

# Setup Django environment
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from django.contrib.auth.models import User

def reset_password():
    print("Connecting to database...")
    user, created = User.objects.get_or_create(username='admin')
    
    if created:
        user.email = 'admin@vigneshmetalmart.com'
        user.is_superuser = True
        user.is_staff = True
        print("Creating a new superuser account...")
    else:
        print("Found existing 'admin' user, resetting password...")

    # Set the new password
    user.set_password('Admin1234!')
    user.save()

    print("\nSuccess!")
    print("--------------------------------")
    print("Username : admin")
    print("Password : Admin1234!")
    print("--------------------------------")

if __name__ == '__main__':
    reset_password()
