from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from app.emails.signals import send_email
from app.notifications.signals import notify_users
from app.registration.models import RegistrationProfile
from app.registration.models import code_generator
from app.registration.signals import post_user_registration_validation, post_user_password_reset_validation

User = get_user_model()


def email_does_not_exist(email):
    try:
        User.objects.get(email=email)
        raise ValidationError(message='This email is taken')
    except User.DoesNotExist:
        return email


def email_does_exist(email):
    try:
        User.objects.get(email=email)
        return email
    except User.DoesNotExist:
        raise ValidationError(message='User does not exist!')


def code_is_valid(code):
    try:
        reg_profile = RegistrationProfile.objects.get(code=code)
        if not reg_profile.code_used:
            return code
        else:
            raise ValidationError(message='This code has already been used!')
    except RegistrationProfile.DoesNotExist:
        raise ValidationError(message='This code is not valid!')


class RegistrationSerializer(serializers.Serializer):
    email = serializers.EmailField(label='Registration E-Mail Address', validators=[email_does_not_exist])

    def save(self, validated_data):
        email = validated_data.get('email')
        new_user = User(
            username=email,
            email=email,
            is_active=False,
        )
        new_user.save()
        #####
        # Creating reg profile here and not with signal because signals are async
        # and I need the code in the reg profile right now.
        reg_profile = RegistrationProfile(
            user=new_user,
            code_type='RV'
        )
        reg_profile.save()
        #####
        send_email.send(sender=User, request=self.context['request'], to=email, email_type='registration_email', code=reg_profile.code)
        return new_user


class RegistrationValidationSerializer(serializers.Serializer):
    email = serializers.EmailField(label='Registration E-Mail Address', validators=[email_does_exist])
    code = serializers.CharField(label='Validation code', write_only=True, validators=[code_is_valid])
    password = serializers.CharField(label='password', write_only=True)
    password_repeat = serializers.CharField(label='password_repeat', write_only=True)
    full_name = serializers.CharField(label='Full name')
    user_type = serializers.CharField(label='User type')

    def validate(self, data):
        code = data.get('code')
        email = data.get('email')
        user = User.objects.get(email=email)
        reg_profile = RegistrationProfile.objects.get(code=code)
        if reg_profile != user.registration_profile:
            raise ValidationError(message='The code does not belong to this email!')
        if data.get('password') != data.get('password_repeat'):
            raise ValidationError(message='Passwords do not match!')
        return data

    def save(self, validated_data):
        email = validated_data.get('email')
        user = User.objects.get(email=email)
        user.full_name = validated_data.get('full_name')
        user.user_type = validated_data.get('user_type')
        user.is_active = True
        user.set_password(validated_data.get('password'))
        user.registration_profile.code_used = True
        user.save()
        user.registration_profile.save()
        post_user_registration_validation.send(sender=User, user=user)
        notify_users.send(sender=User, notification_key='new_user_registered', request=self.context['request'], email=user.email)
        return user


class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField(label='Password Reset E-Mail Address', validators=[email_does_exist])

    def send_password_reset_email(self):
        email = self.validated_data.get('email')
        user = User.objects.get(email=email)
        user.registration_profile.code = code_generator()
        user.registration_profile.code_used = False
        user.registration_profile.code_type = 'PR'
        user.registration_profile.save()
        send_email.send(sender=User, request=self.context['request'], to=email, email_type='password_reset_email', code=user.registration_profile.code)


class PasswordResetValidationSerializer(serializers.Serializer):
    code = serializers.CharField(label='Validation code', write_only=True, validators=[code_is_valid])
    email = serializers.EmailField(label='Registration E-Mail Address', validators=[email_does_exist])
    password = serializers.CharField(label='password', write_only=True)
    password_repeat = serializers.CharField(label='password_repeat', write_only=True)

    def validate(self, data):
        code = data.get('code')
        email = data.get('email')
        user = User.objects.get(email=email)
        reg_profile = RegistrationProfile.objects.get(code=code)
        if reg_profile != user.registration_profile:
            raise ValidationError(message='The code does not belong to this email!')

        if data.get('password') != data.get('password_repeat'):
            raise ValidationError(message='Passwords do not match!')
        return data

    def save(self, validated_data):
        code = validated_data.get('code')
        user = RegistrationProfile.objects.get(code=code).user
        user.set_password(validated_data.get('password'))
        user.registration_profile.code_used = True
        user.save()
        user.registration_profile.save()
        post_user_password_reset_validation.send(sender=User, user=user)
        notify_users.send(sender=User, notification_key='user_reset_password', request=self.context['request'], email=user.email)
        return user


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        # The default result (access/refresh tokens)
        data = super(CustomTokenObtainPairSerializer, self).validate(attrs)
        # Custom data you want to include
        data.update({'user': self.user})
        # and everything else you want to send in the response
        return data
