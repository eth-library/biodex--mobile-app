from django.contrib import admin
from django import forms

from .models import User
from django.contrib.auth.admin import UserAdmin

from ..registration.models import RegistrationProfile


class RegistrationProfileForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super(RegistrationProfileForm, self).__init__(*args, **kwargs)
        if self.instance.pk is None:
            self.empty_permitted = False

    class Meta:
        model = RegistrationProfile
        fields = '__all__'


class RegistrationProfileInline(admin.StackedInline):
    model = RegistrationProfile
    form = RegistrationProfileForm


class CustomUserAdmin(UserAdmin):
    inlines = (RegistrationProfileInline,)
    readonly_fields = ('date_joined',)
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'password1', 'password2')},
         ),
    )
    fieldsets = (
        (None, {'fields': ('email', 'username', 'password', 'user_type')}),
        ('Personal info', {'fields': ('full_name',)}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
        ('Groups', {'fields': ('groups',)}),
    )
    list_display = ('pk', 'email', 'full_name', 'is_staff')
    ordering = ('email',)

    def get_inline_instances(self, request, obj=None):
        if not obj:
            return list()
        return super(CustomUserAdmin, self).get_inline_instances(request, obj)


admin.site.register(User, CustomUserAdmin)
