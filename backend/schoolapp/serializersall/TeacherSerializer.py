from rest_framework import serializers
from ..models import Teacher, Institution
from django.contrib.auth.models import User
from ..serializersall.InstitutionSerializer import InstitutionSerializer, InstitutionPublicSerializer


class TeacherSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    teacher_firstname = serializers.CharField(required=False, allow_blank=True, max_length=100)
    teacher_lastname = serializers.CharField(required=False, allow_blank=True, max_length=100)
    teacher_number = serializers.IntegerField(read_only=False)
    # teacher_institution = serializers.InstitutionSerializer(many=True)

    class Meta:
        model = Teacher
        fields = ['id', 'teacher_firstname', 'teacher_lastname', 'teacher_number',]

    def create(self, validated_data):
        """
        Create and return a new `teacher` instance, given the validated data.
        """
        return Teacher.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Teacher` instance, given the validated data.
        """
        instance.teacher_firstname = validated_data.get('teacher_firstname', instance.teacher_firstname)
        instance.teacher_lastname = validated_data.get('teacher_lastname', instance.teacher_lastname)
        instance.teacher_number = validated_data.get('teacher_number', instance.teacher_number)
        instance.save()
        return instance
    

class TeacherPublicSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=False)
    teacher_firstname = serializers.CharField(read_only=False)
    teacher_lastname = serializers.CharField(read_only=False)
    teacher_number = serializers.IntegerField(read_only=False)
    # teacher_institution = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    teacher_institution = serializers.PrimaryKeyRelatedField(queryset=Institution.objects.all(), read_only=False)
    teacher_institution = InstitutionPublicSerializer()

    class Meta:
        model = Teacher
        fields = [
            'id',
            'teacher_firstname',
            'teacher_lastname',
            'teacher_number',
            'teacher_institution',
        ]


class TeacherCreateSerializer(serializers.ModelSerializer):
    # /create-teacher {payload} 
    class Meta:
        model = Teacher
        fields = '__all__'


class InstitutionCreateSerializer(serializers.ModelSerializer):
    # /create-teacher {payload} 
    class Meta:
        model = Institution
        fields = '__all__'