from rest_framework import serializers
from ..models import Subject, Teacher, AcademicProgram
from django.contrib.auth.models import User
from ..serializersall.TeacherSerializer import TeacherPublicSerializer
from ..serializersall.AcademicProgramSerializer import AcademicProgramPublicSerializer
from ..serializers import StudentPublicSerializer


class test1(serializers.Field):
    # subject_test = serializers.IntegerField(read_only=True)

    def to_representation(self):
        return 43

    def validate_field1(self, value):
        # Perform validation logic for field1
        if len(value) < 5:
            raise serializers.ValidationError("field1 should have at least 5 characters.")
        return value


class SubjectSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    subject_name = serializers.CharField(required=False)
    subject_number = serializers.IntegerField(required=False)
    # subject_teacher = TeacherPublicSerializer(many=True, read_only=False)
    subject_teacher = TeacherPublicSerializer()
    subject_academicprogram = AcademicProgramPublicSerializer()
    # subject_students = StudentPublicSerializer()
    # subject_academicprogram = serializers
    # subject_test = serializers.IntegerField(read_only=True)

    class Meta:
        model = Subject
        fields = ['id', 'subject_name', 'subject_number', 'subject_teacher', 'subject_academicprogram']

    def create(self, validated_data):
        """
        Create and return a new `student` instance, given the validated data.
        """
        return Subject.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Student` instance, given the validated data.
        """
        instance.subject_name = validated_data.get('subject_name', instance.subject_name)
        instance.subject_number = validated_data.get('subject_number', instance.subject_number)
        instance.subject_teacher = validated_data.get('subject_teacher', instance.subject_teacher)
        instance.save()
        return instance
    

class SubjectPublicSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    subject_name = serializers.CharField(required=False)
    subject_number = serializers.IntegerField(required=False)
    # subject_teacher = TeacherPublicSerializer(many=True, read_only=False)
    subject_teacher = TeacherPublicSerializer()
    subject_academicprogram = AcademicProgramPublicSerializer()
    # subject_students = StudentPublicSerializer()
    # subject_academicprogram = serializers
    # subject_test = serializers.IntegerField(read_only=True)
    # subject_test = test1()

    class Meta:
        model = Subject
        fields = ['id', 'subject_name', 'subject_number', 'subject_teacher', 'subject_academicprogram']


class SubjectCreateSerializer(serializers.ModelSerializer):
    # /create-teacher {payload} 
    class Meta:
        model = Subject
        fields = '__all__'


class TeacherCreateSerializer(serializers.ModelSerializer):
    # /create-teacher {payload} 
    class Meta:
        model = Teacher
        fields = '__all__'


class AcademicProgramCreateSerializer(serializers.ModelSerializer):
    # /create-academic {payload} 
    class Meta:
        model = AcademicProgram
        fields = '__all__'


