# insert_achievments.py

import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")  # Ajusta si tienes otro módulo de settings
django.setup()

from achievments.models import Achievement
from django.contrib.auth.models import User

SUPERUSER_USERNAME = "admin"
SUPERUSER_EMAIL = "projectwali272@example.com"
SUPERUSER_PASSWORD = "cacadodo2112"

if not User.objects.filter(username=SUPERUSER_USERNAME).exists():
    print(f"Creating superuser '{SUPERUSER_USERNAME}'...")
    User.objects.create_superuser(
        username=SUPERUSER_USERNAME,
        email=SUPERUSER_EMAIL,
        password=SUPERUSER_PASSWORD,
    )
    print("Superuser created.")
else:
    print(f"Superuser '{SUPERUSER_USERNAME}' already exists.")


ACHIEVEMENTS = [
    {
        "name": "Novice",
        "description": "You've started your journey. Well done!",
        "points_needed": 20,  # 1 x 20
        "icon": "1.png",
    },
    {
        "name": "Apprentice",
        "description": "You've completed your first tasks.",
        "points_needed": 40,  # 2 x 20
        "icon": "2.png",
    },
    {
        "name": "Competent",
        "description": "Your consistency is paying off.",
        "points_needed": 80,  # 4 x 20
        "icon": "3.png",
    },
    {
        "name": "Experienced",
        "description": "You master the basics with ease.",
        "points_needed": 140,  # 7 x 20
        "icon": "4.png",
    },
    {
        "name": "Veteran",
        "description": "Your experience is clear to everyone.",
        "points_needed": 220,  # 11 x 20
        "icon": "5.png",
    },
    {
        "name": "Champion",
        "description": "You've overcome tough challenges.",
        "points_needed": 320,  # 16 x 20
        "icon": "6.png",
    },
    {
        "name": "Master",
        "description": "Your skill is impressive.",
        "points_needed": 440,  # 22 x 20
        "icon": "7.png",
    },
    {
        "name": "Legend",
        "description": "You inspire others around you.",
        "points_needed": 580,  # 29 x 20
        "icon": "8.png",
    },
    {
        "name": "Epic",
        "description": "Your achievements are epic and memorable.",
        "points_needed": 740,  # 37 x 20
        "icon": "9.png",
    },
    {
        "name": "Immortal",
        "description": "You've reached the pinnacle. You’re unforgettable!",
        "points_needed": 920,  # 46 x 20
        "icon": "10.png",
    },
]

for achievement_data in ACHIEVEMENTS:
    Achievement.objects.update_or_create(
        name=achievement_data["name"],
        defaults=achievement_data,
    )

print("Achievements loaded successfully.")
