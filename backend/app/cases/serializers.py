import reverse_geocode
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import serializers
from rest_framework.exceptions import NotFound

from app.cases.models import Case
from app.predictions.serializers import PredictionSerializer


class CaseReadSerializer(serializers.ModelSerializer):
    predictions = PredictionSerializer(many=True)

    class Meta:
        model = Case
        fields = ['id', 'uploaded_image', 'confirmed_image', 'location', 'longitude', 'latitude', 'created', 'prediction_exec_time', 'prediction_model', 'prediction_status', 'user', 'predictions']


class CaseCreateSerializer(CaseReadSerializer):
    class Meta:
        model = Case
        fields = '__all__'

    def create(self, validated_data):
        coordinates = (validated_data.get('latitude'), validated_data.get('longitude')),
        location = reverse_geocode.search(coordinates)
        predictions_relationship = validated_data.pop('predictions')
        validated_data['location'] = f"{location[0].get('city')}, {location[0].get('country')}"
        validated_data['user'] = self.context.get('request').user
        case = Case.objects.create(**validated_data)

        for prediction in predictions_relationship:
            prediction['case'] = case.id
            serializer = PredictionSerializer(data=prediction)
            serializer.is_valid(raise_exception=True)
            serializer.save(case=case)

        return case


class CaseUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Case
        fields = ['uploaded_image', 'confirmed_image']

    def update(self, instance, validated_data):
        confirmed_image = validated_data.get('confirmed_image')

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if confirmed_image is not None:
            try:
                confirmed_prediction = instance.predictions.get(image_id=confirmed_image.name)
            except ObjectDoesNotExist:
                raise NotFound(f"Prediction with image_id '{confirmed_image.name}' not found!")
            confirmed_prediction.confirmed = True
            confirmed_prediction.save()

        instance.save()
        return instance
