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
        fields = '__all__'
        read_only_fields = (
            'status',
            'reviewed_at',
            'created_at',
            'updated_at',
            'certificate_file_url',
        )

    def get_certificate_file_url(self, obj):
        if not obj.certificate_file:
            return None

        request = self.context.get('request')
        url = obj.certificate_file.url

        if request:
            return request.build_absolute_uri(url)

        return url

    def validate_certificate_file(self, value):
        if value.size > 5 * 1024 * 1024:
            raise serializers.ValidationError("File too large (max 5MB).")
        return value

    def validate(self, data):
        request = self.context.get('request')
        user = request.user if request else None

        if user is None:
            raise serializers.ValidationError("Request user is required.")

        if DoctorApplication.objects.filter(user=user).exists():
            raise serializers.ValidationError("You already submitted an application.")

        if user.role != 'client':
            raise serializers.ValidationError("Only clients can apply to become doctors.")

        return data
