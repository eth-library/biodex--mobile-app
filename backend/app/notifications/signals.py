import django.dispatch

notify_users = django.dispatch.Signal(providing_args=["notification_key"])
