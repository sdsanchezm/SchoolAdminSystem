from rest_framework import serializers
from ..models import Grade
from django.contrib.auth.models import User
from datetime import datetime
from django.utils import timezone

# in this case, each field must be declared, because its "serializers.Serializer" and is NOT serializers.ModelSerializer
class GradeSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    # subject_name = serializers.CharField(required=False)
    # subject_number = serializers.IntegerField(required=False)

    class Meta:
        model = Grade
        fields = ['id', 'grade_e1', 'grade_e2', 'grade_e3', 'grade_ef']

    def create(self, validated_data):
        """
        Create and return a new `student` instance, given the validated data.
        """
        return Grade.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Student` instance, given the validated data.
        """
        instance.grade_e1 = validated_data.get('grade_e1', instance.grade_e1)
        instance.grade_e2 = validated_data.get('grade_e2', instance.grade_e2)
        instance.grade_e3 = validated_data.get('grade_e3', instance.grade_e3)
        instance.grade_ef = validated_data.get('grade_ef', instance.grade_ef)
        instance.grade_date = datetime.now()
        instance.save()
        return instance
    

class GradePublicSerializer(serializers.Serializer):
    # id = serializers.IntegerField(read_only=True)
    # subject_name = serializers.CharField(required=False)
    # subject_number = serializers.IntegerField(required=False)
    # subject_teacher = TeacherPublicSerializer(many=True, read_only=False)
    # subject_teacher = TeacherPublicSerializer()
    # subject_academicprogram = AcademicProgramPublicSerializer()
    # subject_students = StudentPublicSerializer()
    # subject_academicprogram = serializers
    # subject_test = serializers.IntegerField(read_only=True)
    # subject_test = test1()

    class Meta:
        model = Grade
        fields = ['id', 'grade_e1', 'grade_e2', 'grade_e3', 'grade_ef']
        # fields = '__all__'

## this is a serializers.ModelSerializer and fields could not be declared
class GradePublicSerializerAll(serializers.ModelSerializer):


    def update(self, instance, validated_data):
        """
        Update and return an existing `Student` instance, given the validated data.
        """
        instance.grade_e1 = validated_data.get('grade_e1', instance.grade_e1)
        instance.grade_e2 = validated_data.get('grade_e2', instance.grade_e2)
        instance.grade_e3 = validated_data.get('grade_e3', instance.grade_e3)
        instance.grade_ef = validated_data.get('grade_ef', instance.grade_ef)
        instance.grade_date = timezone.now()
        instance.save()
        return instance
    

    class Meta:
        model = Grade
        fields = '__all__'





