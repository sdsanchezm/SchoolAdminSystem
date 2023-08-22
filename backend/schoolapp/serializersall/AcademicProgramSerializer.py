from rest_framework import serializers
from ..models import AcademicProgram, Subject
from django.contrib.auth.models import User
from ..serializersall.InstitutionSerializer import InstitutionPublicSerializer


class AcademicProgramSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    academicprogram_name = serializers.CharField(required=False, allow_blank=True, max_length=100)
    academicprogram_number = serializers.IntegerField(read_only=False)

    class Meta:
        model = AcademicProgram
        fields = ['id', 'academicprogram_name', 'academicprogram_number']

    def create(self, validated_data):
        """
        Create and return a new `institution` instance, given the validated data.
        """
        return AcademicProgram.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Student` instance, given the validated data.
        """
        instance.academicprogram_name = validated_data.get('academicprogram_name', instance.academicprogram_name)
        instance.academicprogram_number = validated_data.get('academicprogram_number', instance.academicprogram_number)
        instance.save()
        return instance
    
class AcademicProgramPublicSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    academicprogram_name = serializers.CharField(read_only=False)
    academicprogram_number = serializers.IntegerField(read_only=False)
    academicprogram_institution = InstitutionPublicSerializer()

    class Meta:
        model: AcademicProgram
        # fields = '__all__'
        fields = [
            'id',
            'academicprogram_name',
            'academicprogram_number',
            'academicprogram_institution',
        ]


class AcademicProgramPublicSerializerAll(serializers.ModelSerializer):
    # /create-teacher {payload} 
    class Meta:
        model = AcademicProgram
        fields = '__all__'


class AcademicProgramNewSerializer(serializers.ModelSerializer):
    # /create-teacher {payload} 
    class Meta:
        model = AcademicProgram
        fields = '__all__'


class AcademicProgramProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = '__all__'