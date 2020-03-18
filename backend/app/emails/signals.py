import django.dispatch

send_email = django.dispatch.Signal(providing_args=["user"])
