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
- Built for iOS and Android
- Tech Stack
    - React-Native with [Expo framework](https://docs.expo.io/)

[Frontend README](./frontend/README.md)

## REST API
- This API is is used for user management as well as storing data about prediction cases. This data could be used to retrieve all previous
cases, analysis etc.
- Tech Stack
    - Django and Django REST Framework
    - Postgres
    - Redis
    - Celery

[Backend README](./backend/README.md)

## REST API Deployment
- Teck Stack
    - Docker
    - Docker Compose
    - Nginx
    - Gunicorn
    - Gitlab CI/CD

[REST API Deployment README](./backend/README_deployment.md)

## Predictions API - not in this codebase!

The predictions API is in a separate codebase. 
It is used in this project to send a picture of a butterfly and get the related predictions in return.
