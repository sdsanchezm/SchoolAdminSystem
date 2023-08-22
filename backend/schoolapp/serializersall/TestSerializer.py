from rest_framework import serializers


class TestSerializer1(serializers.Field):
    def to_representation(self, value):
        # Return the value as is
        return value + 1

    def to_internal_value(self, data):
        # Raise a validation error if the data is not a valid integer
        try:
            return int(data)
        except (ValueError, TypeError):
            raise serializers.ValidationError("Invalid integer.")
    

class TestSerializer3(serializers.Serializer):
    number = TestSerializer1()


class TestSerializer2(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    subject_name = serializers.CharField(required=False)
    subject_number = serializers.IntegerField(required=False)
    # subject_teacher = TeacherPublicSerializer(many=True, read_only=False)
    # subject_teacher = TeacherPublicSerializer()
    # subject_academicprogram = AcademicProgramPublicSerializer()
    # subject_students = StudentPublicSerializer()
    # subject_academicprogram = serializers
    # subject_test = serializers.IntegerField(read_only=True)

    class Meta:
        # model = Subject
        fields = ['id', 'subject_name', 'subject_number']

    def create(self, number):
        """
        Create and return a new `student` instance, given the validated data.
        """
        return number + 1
