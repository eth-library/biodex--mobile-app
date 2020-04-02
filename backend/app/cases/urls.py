from django.urls import path

from app.cases.views import CaseListView, CaseCreateView, CaseUpdateView, CaseReadView

app_name = 'cases'

urlpatterns = [
    path('', CaseListView.as_view(), name='get-all-cases'),
    path('create/', CaseCreateView.as_view(), name='create-new-case'),
    path('confirm/<int:pk>/', CaseUpdateView.as_view(), name='get-update-case'),
    path('<int:pk>/', CaseReadView.as_view(), name='get-case')
]
