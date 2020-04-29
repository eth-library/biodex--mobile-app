# REST API Deployment

https://api.lepi.propulsion-home.ch is running in a Digital Ocean droplet. The code is pushed to Gitlab and running through a pipeline every time to check that everything runs smoothly. After that, the new code can be deployed manually via Gitlab.

## Things you need to change
1. Change the hostname to your hostname in the nginx conf file for deployment. Currently it is set to api.lepi.propulsion-home.ch.

2. IMPORTANT!: Change the secret key in the prod.env or actually don't use a prod.env at all and inject all env variables 
you need from gitlab. You can generate a new secret key here: https://djecrety.ir/

3. Change the sentry dsn in the env files. To get a dsn, create a free account on https://sentry.io. Sentry will register
errors and will let you monitor bugs and app crashes.

4. Set up an email account in prod.env and dev.env. Or actually don't use a prod.env at all and inject all env variables 
you need from gitlab.

```
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = '***'
EMAIL_HOST_PASSWORD = '***'
DEFAULT_FROM_EMAIL = '***'
```

5. Change the postgres username and password in prod.env and dev.env. Or actually don't use a prod.env at all and inject all 
env variables you need from gitlab.

6. Update image in docker-compose.deploy.yml if you pull from a different gitlab registry
