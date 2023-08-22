from rest_framework import serializers
# from schoolapp.serializersall.SubjectSerializer import SubjectSerializer
from .models import Student, Institution, Student, Subject, Grade, Teacher
from .serializersall.TeacherSerializer import TeacherPublicSerializer
from django.contrib.auth.models import User


class StudentSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    student_firstname = serializers.CharField(required=False, allow_blank=True, max_length=100)
    student_lastname = serializers.CharField(required=False, allow_blank=True, max_length=100)
    student_number = serializers.IntegerField(required=False, read_only=False)

    class Meta:
        model = Student
        fields = ['id', 'student_firstname', 'student_lastname', 'student_number']

    def create(self, validated_data):
        """
        Create and return a new `student` instance, given the validated data.
        """
        return Student.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Student` instance, given the validated data.
        """
        instance.student_firstname = validated_data.get('student_firstname', instance.student_firstname)
        instance.student_lastname = validated_data.get('student_lastname', instance.student_lastname)
        instance.student_number = validated_data.get('student_number', instance.student_number)
        instance.save()
        return instance
    

class StudentSerializerNew2(serializers.ModelSerializer):
    
    class Meta:
        model = Student
        fields = '__all__'

    def create(self, validated_data):
        # Custom logic for creating a new Student record
        # For example, you can perform additional processing or handle related models

        # Create a new Student instance using the validated data
        student = Student.objects.create(
            student_firstname=validated_data['student_firstname'],
            student_lastname=validated_data['student_lastname'],
            student_number=validated_data['student_number'],
            # Set other fields as needed
        )

        # Handle the ManyToManyField 'student_subject' if necessary
        student_subject_data = validated_data.get('student_subject')
        if student_subject_data:
            for subject in student_subject_data:
                student.student_subject.add(subject)

        # Set the ForeignKey fields 'student_institution' and 'student_academicprogram' if necessary
        student_institution = validated_data.get('student_institution')
        if student_institution:
            student.student_institution = student_institution

        student_academicprogram = validated_data.get('student_academicprogram')
        if student_academicprogram:
            student.student_academicprogram = student_academicprogram

        student.save()  # Save the changes

        return student


    def update(self, instance, validated_data):
        """
        Update and return an existing `Student` instance, given the validated data.
        """
        # Custom logic for updating the Student instance
        # For example, you can perform additional processing or handle related models

        # Update the fields of the existing Student instance with the validated data
        instance.student_firstname = validated_data.get('student_firstname', instance.student_firstname)
        instance.student_lastname = validated_data.get('student_lastname', instance.student_lastname)
        instance.student_number = validated_data.get('student_number', instance.student_number)
        # Update other fields as needed

        # Handle the ManyToManyField 'student_subject' if necessary
        student_subject_data = validated_data.get('student_subject')
        if student_subject_data:
            instance.student_subject.clear()  # Clear existing subjects
            for subject in student_subject_data:
                instance.student_subject.add(subject)

        # Set the ForeignKey fields 'student_institution' and 'student_academicprogram' if necessary
        student_institution = validated_data.get('student_institution')
        if student_institution:
            instance.student_institution = student_institution

        student_academicprogram = validated_data.get('student_academicprogram')
        if student_academicprogram:
            instance.student_academicprogram = student_academicprogram

        instance.save()  # Save the changes

        return instance
    

class StudentSerializerNew(serializers.ModelSerializer):
    
    class Meta:
        model = Student
        fields = '__all__'

    def create(self, validated_data):
        """
        Create and return a new `student` instance, given the validated data.
        """
        return Student.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Student` instance, given the validated data.
        """
        # instance.student_firstname = validated_data.get('student_firstname', instance.student_firstname)
        # instance.student_lastname = validated_data.get('student_lastname', instance.student_lastname)
        # instance.student_number = validated_data.get('student_number', instance.student_number)
        # # 
        instance.save()
        return instance


class StudentPublicSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=False)
    student_firstname = serializers.CharField(read_only=False)
    student_lastname = serializers.CharField(read_only=False)
    student_number = serializers.IntegerField(read_only=False)
    # teacher_institution = serializers.PrimaryKeyRelatedField(queryset=Institution.objects.all(), read_only=False)
    # teacher_institution = InstitutionPublicSerializer()

    class Meta:
        model = Student
        fields = [
            'id',
            'student_firstname',
            'student_lastname',
            'student_number'
        ]


class SubjectSerializer2(serializers.ModelSerializer):
    
    class Meta:
        model = Subject
        fields = '__all__'


class StudentSerializer2(serializers.ModelSerializer):
    
    class Meta:
        model = Student
        fields = '__all__'


class StudentSerializerUpdate(serializers.ModelSerializer):
    
    class Meta:
        model = Student
        fields = '__all__'

    def update(self, instance, validated_data):
        objects1 = list(instance.student_subject.all())
        new_object = validated_data.get('student_subject')
        if new_object:
            objects1.extend(new_object)

        instance.student_subject.set(objects1)

        return instance


class AcademicProgramSerializer1(serializers.ModelSerializer):
    
    class Meta:
        model = Student
        fields = '__all__'


class StudentSerializer3(serializers.ModelSerializer):
    academic_programs = AcademicProgramSerializer1(many=True, read_only=True)

    class Meta:
        model = Student
        fields = '__all__'


class StudentSubjectSerializer(serializers.ModelSerializer):
    # student_subject = SubjectSerializer2()
    # student_teacher = Teacher.onjects.get()
    # subject_teacher = TeacherPublicSerializer(many=False, queryset=Teacher.objects.all())

    class Meta:
        model = Student
        fields = '__all__'


class GradeSerializer1(serializers.ModelSerializer):
    # student_subject = SubjectSerializer2()

    class Meta:
        model = Grade
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    snippets = serializers.PrimaryKeyRelatedField(many=True, queryset=Student.objects.all())

    class Meta:
        model = User
        fields = ['id', 'username']


## serializers 4 - to be used with StudentProfileView4 ###############################
class SubjectSerializer4(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ('id', 'subject_name',)


class StudentSerializer4(serializers.ModelSerializer):
    student_subjects = SubjectSerializer4(source='student_subject', many=True, read_only=True)

    class Meta:
        model = Student
        fields = ('student_firstname', 'student_lastname', 'student_subjects')


## serializers 5 - to be used with StudentProfileView4 ###############################
class GradeSerializer5(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = ('grade_e1', 'grade_e2', 'grade_e3', 'grade_ef')


class SubjectSerializer5(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ('subject_name',)


class StudentSerializer5(serializers.ModelSerializer):
    student_subjects = SubjectSerializer5(source='student_subject', many=True, read_only=True)
    student_grades = GradeSerializer5(source='gr_student', many=True, read_only=True)

    class Meta:
        model = Student
        fields = ('student_firstname', 'student_lastname', 'student_subjects', 'student_grades')


## serializers 6 - to be used with StudentProfileView4 ###############################
class GradeSerializer6(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = ('id', 'grade_e1', 'grade_e2', 'grade_e3', 'grade_ef')


class SubjectSerializer6(serializers.ModelSerializer):
    subject_grades = GradeSerializer6(source='gr_subject', many=True, read_only=True)

    class Meta:
        model = Subject
        fields = ('subject_name', 'subject_grades')


class StudentSerializer6(serializers.ModelSerializer):
    student_subjects = SubjectSerializer6(source='student_subject', many=True, read_only=True)

    class Meta:
        model = Student
        fields = ('student_firstname', 'student_lastname', 'student_subjects')


## serializers 7 - to be used with StudentProfileView4 ###############################
class GradeSerializer7(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = ('grade_student', 'grade_subject', 'grade_e1', 'grade_e2', 'grade_e3', 'grade_ef')


class SubjectSerializer7(serializers.ModelSerializer):
    subject_grades = GradeSerializer7(source='gr_subject', many=True, read_only=True)

    class Meta:
        model = Subject
        fields = ('subject_name','subject_grades')


class StudentSerializer7(serializers.ModelSerializer):
    student_subjects = SubjectSerializer7(source='student_subject', many=True, read_only=True)

    class Meta:
        model = Student
        fields = ('student_firstname', 'student_lastname', 'student_subjects')


## serializers 8 - ##################################################
class GradeSerializer8(serializers.ModelSerializer):
    class Meta:
        model = Grade
        # fields = ('grade_e1', 'grade_e2', 'grade_e3', 'grade_ef')
        fields = ('grade_student', 'grade_e1', 'grade_e2', 'grade_e3', 'grade_ef')


class SubjectSerializer8(serializers.ModelSerializer):
    subject_grades = GradeSerializer8(source='gr_subject', many=True, read_only=True)

    class Meta:
        model = Subject
        fields = ('subject_name', 'subject_grades')


class StudentSerializer8(serializers.ModelSerializer):
    student_subjects = SubjectSerializer8(source='student_subject', many=True, read_only=True)

    class Meta:
        model = Student
        fields = ('student_firstname', 'student_lastname', 'student_subjects')


## serializers 9 - #########################################################
class GradeSerializer9(serializers.ModelSerializer):
    # grade_total = serializers.SerializerMethodField(method_name=total_calc)

    # def total_calc(self):
    #     grades = Grade.objects.filter(grade_student=student, grade_subject=subject)
    #     return GradeSerializer9(grades, many=True).data

    class Meta:
        model = Grade
        fields = ('id', 'grade_e1', 'grade_e2', 'grade_e3', 'grade_ef')


class SubjectSerializer9(serializers.ModelSerializer):
    # https://www.django-rest-framework.org/api-guide/fields/#serializermethodfield
    # method_name - The name of the method on the serializer to be called. If not included this defaults to get_<field_name>. 
    # SerializerMethodField(method_name=None)
    subject_grades = serializers.SerializerMethodField()

    def get_subject_grades(self, subject):
        student = self.context['student']
        grades = Grade.objects.filter(grade_student=student, grade_subject=subject)
        return GradeSerializer9(grades, many=True).data

    class Meta:
        model = Subject
        fields = ('id', 'subject_name','subject_number', 'subject_grades')


class StudentSerializer9(serializers.ModelSerializer):
    # student_subjects = SubjectSerializer9(many=True, read_only=True, context={'student': self.instance})
    # https://www.django-rest-framework.org/api-guide/fields/#serializermethodfield
    # method_name - The name of the method on the serializer to be called. If not included this defaults to get_<field_name>. 
    # SerializerMethodField(method_name=None)
    student_subjects = serializers.SerializerMethodField()

    def get_student_subjects(self, student):
        subjects = student.student_subject.all()
        return SubjectSerializer9(subjects, many=True, context={'student': student}).data

    class Meta:
        model = Student
        fields = ('id', 'student_firstname', 'student_lastname', 'student_number', 'student_institution', 'student_academicprogram', 'student_subjects')

