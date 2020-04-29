# Project description

Sorting the backlog of physical butterfly and moth specimens at the ETH Entomological Collection will require the assistance of staff and volunteers who have no prior training in species 
identification. To enable these individuals to contribute effectively, they require a technological aid to allow them to differentiate between the different hierarchical groupings of 
butterflies and moths. This will allow the workload for subject experts to be significantly reduced.

A publicly available mobile application for non-expert entomological collection workers, which suggests the most likely species for each specimen of butterfly or moth photographed. This 
will allow the non-expert staff to correctly sort the majority of specimens which can later be quickly checked by an expert.

- [Mobile App](#mobile-app)
- [REST API](#rest-api)
- [REST API Deployment](#rest-api-deployment)
- [Predictions API - not in this codebase!](#predictions-api---not-in-this-codebase!)

## Mobile App
- React-Native with Expo framework
[more info](./frontend/README.md)

## REST API
- Django REST Framework
- Postgres
- Redis
- Celery
[more info](./backend/README.md)

## REST API Deployment
- Docker
- Docker Compose
- Nginx
- Gunicorn
[more info](./backend/README_deployment.md)

## Predictions API - not in this codebase!

The predictions API is in a separate codebase. It is used in this project to send a picture of a butterfly and get the related predictions in return.
