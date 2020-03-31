from collections import Mapping, OrderedDict

import reverse_geocode
from django.core.exceptions import ObjectDoesNotExist
from django.core.exceptions import ValidationError as DjangoValidationError
from rest_framework import serializers
from rest_framework.exceptions import NotFound, ValidationError
from rest_framework.fields import get_error_detail, set_value, SkipField
from rest_framework.settings import api_settings

from app.cases.models import Case
from app.predictions.serializers import PredictionSerializer


class CaseReadSerializer(serializers.ModelSerializer):
    predictions = PredictionSerializer(many=True)

    class Meta:
        model = Case
        fields = ['id', 'uploaded_image', 'confirmed_image', 'location', 'longitude', 'latitude', 'created', 'prediction_exec_time', 'prediction_model', 'prediction_status', 'user', 'predictions']


class CaseCreateSerializer(serializers.ModelSerializer):
    predictions = PredictionSerializer(many=True)

    class Meta:
        model = Case
        fields = ['id', 'uploaded_image', 'confirmed_image', 'location', 'longitude', 'latitude', 'created', 'prediction_exec_time', 'prediction_model', 'prediction_status', 'user', 'predictions']

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

    def to_internal_value(self, data):
        if not isinstance(data, Mapping):
            message = self.error_messages['invalid'].format(
                datatype=type(data).__name__
            )
            raise ValidationError({
                api_settings.NON_FIELD_ERRORS_KEY: [message]
            }, code='invalid')

        ret = OrderedDict()
        errors = OrderedDict()
        fields = self._writable_fields

        for field in fields:
            if hasattr(field, 'many') and field.many:
                for el in data[field.field_name]:
                    if ret.get(field.field_name):
                        ret[field.field_name].append(el)
                    else:
                        ret[field.field_name] = [el]
            else:
                validate_method = getattr(self, 'validate_' + field.field_name, None)
                primitive_value = field.get_value(data)
                try:
                    validated_value = field.run_validation(primitive_value)
                    if validate_method is not None:
                        validated_value = validate_method(validated_value)
                except ValidationError as exc:
                    errors[field.field_name] = exc.detail
                except DjangoValidationError as exc:
                    errors[field.field_name] = get_error_detail(exc)
                except SkipField:
                    pass
                else:
                    set_value(ret, field.source_attrs, validated_value)

        if errors:
            raise ValidationError(errors)

        return ret


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
