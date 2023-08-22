from rest_framework import serializers
from ..models import Institution
from django.contrib.auth.models import User


class InstitutionSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    institution_name = serializers.CharField(required=False, allow_blank=True, max_length=100)
    institution_number = serializers.IntegerField(read_only=False)

    class Meta:
        model = Institution
        fields = ['id', 'institution_name', 'institution_number']

    def create(self, validated_data):
        """
        Create and return a new `institution` instance, given the validated data.
        """
        return Institution.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Student` instance, given the validated data.
        """
        instance.institution_name = validated_data.get('institution_name', instance.institution_name)
        instance.institution_number = validated_data.get('institution_number', instance.institution_number)
        instance.save()
        return instance
    
class InstitutionPublicSerializer(serializers.Serializer):
    institution_name = serializers.CharField(read_only=False)
    institution_number = serializers.IntegerField(read_only=False)

    class Meta:
        model: Institution
        fields = [
            'id',
            'institution_name',
            'institution_number',
        ]


class InstitutionPublicSerializerAll(serializers.Serializer):

    class Meta:
        model: Institution
        fields = '__all__'