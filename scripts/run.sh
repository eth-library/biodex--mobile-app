#!/bin/bash
python -c "import time; time.sleep(5)" # Wait for postgres to start up
python manage.py makemigrations
python manage.py migrate
python manage.py collectstatic --no-input
gunicorn --workers=4 --bind=127.0.0.1:8000 app.wsgi:application --reload