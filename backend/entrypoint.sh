#!/bin/sh


echo "Database is up - running migrations"
python manage.py makemigrations --noinput
python manage.py migrate --noinput


echo "Inserting achievements..."
python insert_achievments.py



exec gunicorn core.wsgi:application --bind 0.0.0.0:8000