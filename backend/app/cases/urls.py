from django.urls import path

from app.cases.views import CaseListView, CaseCreateView, CaseReadUpdateView

app_name = 'cases'

urlpatterns = [
    path('', CaseListView.as_view(), name='get-all-cases'),
    path('create/', CaseCreateView.as_view(), name='create-new-case'),
    path('<int:pk>/', CaseReadUpdateView.as_view(), name='get-update-case')
]
