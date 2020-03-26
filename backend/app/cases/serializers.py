from rest_framework import serializers

from app.cases.models import Case


class CaseSerializer(serializers.ModelSerializer):
    class Meta:
        model: Case
        fields: '__all__'


class CaseCreateSerializer(CaseSerializer):
    pass


class CaseUpdateSerializer(CaseSerializer):
    pass
