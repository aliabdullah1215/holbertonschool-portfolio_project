from rest_framework import serializers
from .models import DoctorApplication, User

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'role')

    def create(self, validated_data):
        # Create the user while hashing the password
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password'],
            role=validated_data.get('role', 'client')
        )
        return user


class CurrentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'role')


class DoctorApplicationSerializer(serializers.ModelSerializer):
    certificate_file_url = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = DoctorApplication
        fields = (
            'id',
            'full_name',
            'age',
            'specialty',
            'phone_number',
            'contact_email',
            'certificate_file',
            'certificate_file_url',
            'status',
            'reviewed_at',
            'created_at',
            'updated_at',
        )
        read_only_fields = (
            'status',
            'reviewed_at',
            'created_at',
            'updated_at',
            'certificate_file_url',
        )

    def get_certificate_file_url(self, obj):
        request = self.context.get('request')

        if not obj.certificate_file:
            return None

        if request:
            return request.build_absolute_uri(obj.certificate_file.url)

        return obj.certificate_file.url


class ApprovedDoctorSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = DoctorApplication
        fields = (
            'id',
            'username',
            'full_name',
            'specialty',
            'phone_number',
            'contact_email',
        )
