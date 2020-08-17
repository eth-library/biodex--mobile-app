#!/bin/bash

# # podman create network
POD_NAME=biodex_mob

#create directories if not already existing
VOL_DIR=~/biodex/volumes/mob
VOL_MEDIA=$VOL_DIR/mediafiles
VOL_STATIC=$VOL_DIR/staticfiles
VOL_DB=$VOL_DIR/postgres
VOL_REDIS=$VOL_DIR/redis
VOL_NGINX=$VOL_DIR/nginx

mkdir -p -v $VOL_MEDIA
mkdir -p -v $VOL_STATIC
mkdir -p -v $VOL_DB
mkdir -p -v $VOL_REDIS
mkdir -p -v $VOL_NGINX

# get these from environment variables when finished debugging
# define host ports for services
PORT_PROXY_HOST=$(grep -Eo '(^PORT_PROXY_HOST=)([0-9]+)' .env.prod | grep -Eo '[0-9]+')

# define container ports for services
PORT_PROXY_CTR=80
PORT_DB_CTR=5432
PORT_MOB_CTR=8000
PORT_RED_CTR=6379

echo "creating pod $POD_NAME"
podman pod create \
    -p $PORT_PROXY_HOST:$PORT_PROXY_CTR \
    -p $PORT_DB_HOST:$PORT_DB_CTR \
    -p $PORT_MOB_HOST:$PORT_MOB_CTR \
    -n $POD_NAME

# DATABASE
CTR_NAME=biodex_mob_db-prod-ctr
echo "running $CTR_NAME"
podman run \
    --name $CTR_NAME \
    --pod $POD_NAME \
    -d \
    --env-file ./.env.prod \
    --volume $VOL_DB:/var/lib/postgresql/data/ \
    --restart always \
    postgres:12

#MOBILE APP API
CTR_NAME_MOB=biodex_mob_api-prod-ctr
echo "running $CTR_NAME_MOB"
podman run \
    --name $CTR_NAME_MOB \
    --pod $POD_NAME \
    -d \
    --volume $VOL_STATIC:/static-files \
    --volume $VOL_MEDIA:/media-files \
    --env-file ./.env.prod \
    localhost/biodex/mob-prod-img:latest \
    sh /scripts/run.sh

#REDIS
CTR_NAME=biodex_mob_redis-prod-ctr
echo "running $CTR_NAME"
podman run \
    --name $CTR_NAME \
    --pod $POD_NAME \
    -d \
    --env-file ./.env.prod \
    --volume $VOL_REDIS:/data \
    --restart always \
    redis:latest 

#CELERY
CTR_NAME_MOB=biodex_mob_celery-prod-ctr
echo "running $CTR_NAME_MOB"
podman run \
    --name $CTR_NAME_MOB \
    --pod $POD_NAME \
    -d \
    --volume $VOL_STATIC:/static-files \
    --volume $VOL_MEDIA:/media-files \
    --env-file ./.env.prod \
    --restart always \
    biodex/mobapi-prod:latest \
    celery -A app worker -l info

#REVERSE PROXY
CTR_NAME=biodex_mob_nginx-prod-ctr
echo "running $CTR_NAME"
podman run \
    --name $CTR_NAME \
    -d \
    --pod $POD_NAME \
    --volume $VOL_NGINX:/etc/nginx/conf.d \
    --volume $VOL_STATIC:/data/staticfiles:ro \
    --volume $VOL_MEDIA:/data/mediafiles:ro \
    nginx:1


# podman exec -d biodex_mob_api-prod-ctr sh /scripts/run.sh
# gunicorn --workers=4 --bind=127.0.0.1:8000 app.wsgi:application --reload
# python -c "import time; time.sleep(3)" # Wait for postgres to start up
# python manage.py migrate
# python manage.py collectstatic --no-input
# need to manually create a superuser
# podman exec -it $CTR_NAME_MOB python manage.py createsuperuser

# # #'loading fixtures'
# podman exec $CTR_NAME_WEB sh load_fixtures.sh