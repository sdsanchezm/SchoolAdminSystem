from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from .models import Student, Institution, Subject, Grade
from .serializers import StudentSerializer, UserSerializer, StudentSerializer3, StudentSerializer4, StudentSerializer5, StudentSerializer6, StudentSerializer7, StudentSerializer8, StudentSerializer9, StudentSerializerUpdate, StudentSerializerNew, StudentSerializerNew2
from .serializersall.TestSerializer import TestSerializer1, TestSerializer3
from .serializersall.InstitutionSerializer import InstitutionSerializer
from .serializers import StudentSubjectSerializer, StudentSerializer2, SubjectSerializer2, GradeSerializer1
from .serializersall.GradeSerializer import GradeSerializer
from django.http import Http404



class HomeView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        content = {"message": "welcome to the home page"}
        return Response(content)

# logout class, the token must be part of the body in the request, not as a Bearer Token is only for "access_token", "refresh_token" is for the body
class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            con1 = {"message": "logged out ok"}
            return Response(con1, status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            con1 = {"message": "incorrect"}
            return Response(con1, status=status.HTTP_400_BAD_REQUEST)


class TestViewA(APIView):
    # permission_classes = (IsAuthenticated,)

    def get(self, request):
        num1 = 54
        num2 = 66
        # content = num1 + num2
        # content = { "result": num1 + num2 }
        content = { "result": num1 + num2 }
        return Response(content)
    

class TestViewB(APIView):
    # permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        number_x = 42
        serializer = TestSerializer3({'number': number_x})
        return Response(serializer.data)
    

class StudentView(APIView):
    """
    Class to handle Students Data
    """
    
    def get_student(self, pk):
        try:
            return Student.objects.get(pk=pk)
        except Student.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        student = self.get_student(pk)
        serializer = StudentSerializer(student)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        student = self.get_student(pk)
        serializer = StudentSerializerNew2(student, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        student = self.get_student(pk)
        student.delete()
        return Response({"message":"record deleted"}, status=status.HTTP_204_NO_CONTENT)


class StudentUpdateView(APIView):

    def get_student(self, pk):
        try:
            return Student.objects.get(pk=pk)
        except Student.DoesNotExist:
            raise Http404
        
    def put(self, request, pk, format=None):
        student1 = self.get_student(pk)
        print(request.data)
        print(type(request.data))
        print(student1)
        serializer = StudentSerializerUpdate(student1, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


## View 1 - shows list of subjects and the students subscribed to that subject #######################################
class StudentSubjectView1(APIView):
    def get(self, request, *args, **kwargs):
        subjects = Subject.objects.all()
        serialized_data = []
        for subject in subjects:
            serialized_subject = {}
            serialized_subject['subject_id'] = subject.pk
            serialized_subject['subject_name'] = subject.subject_name
            # serialized_subject['students'] = StudentSubjectSerializer(Student.objects.all(), many=True).data
            students = Student.objects.filter(student_subject__id=subject.pk).order_by('student_firstname')
            serialized_subject['students'] = StudentSubjectSerializer(students, many=True).data
            serialized_data.append(serialized_subject)
        return Response(serialized_data)


## View 2 - shows list of subjects and the students subscribed to that subject #######################################
class StudentSubjectView2(APIView):
    def get(self, request, *args, **kwargs):
        subjects = Subject.objects.all().order_by('subject_name')
        serialized_data = SubjectSerializer2(subjects, many=True).data
        for subject_data in serialized_data:
            subject_id = subject_data['id']
            students = Student.objects.filter(student_subject__id=subject_id).order_by('student_firstname')
            subject_data['students'] = StudentSerializer2(students, many=True).data
        return Response(serialized_data)
    
## View - shows ONLY ONE subject and the students subscribed to that subject #######################################
class StudentSubjectViewItem(APIView):

    def get_subject(self, pk):
        try:
            return Subject.objects.get(pk=pk)
        except Subject.DoesNotExist:
            raise Http404
        
    def get(self, request, pk, *args, **kwargs):
        subjects = self.get_subject(pk)
        serializer = SubjectSerializer2(subjects).data
        subject_id = serializer['id']
        students = Student.objects.filter(student_subject__id=subject_id)
        serializer['students'] = StudentSubjectSerializer(students, many=True).data
        return Response(serializer)
    

    # def get(self, request, pk, format=None):
    #     student = self.get_student(pk)
    #     serializer = StudentSerializer(student)
    #     return Response(serializer.data)


class StudentList(APIView):
    """
    This is the StudentList view
    """
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request, format=None):
        student = Student.objects.all()
        serializer = StudentSerializer(student, many=True)
        return Response(serializer.data)
    
    # DEFAULT Post method here ==========================
    def post(self, request, format=None):
        serializer = StudentSerializerNew2(data=request.data)
        if serializer.is_valid():
            # serializer.save()
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    
    def perform_create(self, serializer):
        serializer.save()


## View - shows #######################################
class StudentProfileView1(APIView):

    def get_student(self, pk):
        try:
            return Student.objects.get(pk=pk)
        except Student.DoesNotExist:
            raise Http404
        
    def get(self, request, pk, *args, **kwargs):
        student = self.get_student(pk)
        serializer = StudentSerializer2(student).data
        student_id = serializer['id']
        grades = Grade.objects.filter(grade_student__id=student_id)
        serializer['grades'] = GradeSerializer1(grades, many=True).data
        return Response(serializer)


## View - shows #######################################
class StudentProfileView2(APIView):

    def get_student(self, pk):
        try:
            return Student.objects.get(pk=pk)
        except Student.DoesNotExist:
            raise Http404
        
    def get_subject(self, pk):
        try:
            return Subject.objects.get(pk=pk)
        except Student.DoesNotExist:
            raise Http404
        
    def get(self, request, pk, *args, **kwargs):
        student = self.get_student(pk)
        serializer = StudentSerializer2(student).data
        print(serializer['student_subject'])
        for subject_id in serializer['student_subject']:
            print(subject_id)
            # subject_id = subject['id']
            subj1 = self.get_subject(subject_id)
            print(subj1.subject_name)
            # subj1 = Subject.objects.get(pk=subject_id)
            serializer['subjects1'] = SubjectSerializer2(subj1).data

        return Response(serializer)
    

## View - shows #######################################
class StudentProfileView3(APIView):

    def get_student(self, pk):
        try:
            return Student.objects.get(pk=pk)
        except Student.DoesNotExist:
            raise Http404
        
    def get(self, request, pk, *args, **kwargs):
        students = Student.objects.prefetch_related('student_subject', 'student_subject__subject_academicprogram')
        serializer = StudentSerializer3(students, many=True)
        return Response(serializer.data)


## View 4 - #############################################
class StudentProfileView4(APIView):
    def get(self, request, *args, **kwargs):
        students = Student.objects.prefetch_related('student_subject')
        serializer = StudentSerializer4(students, many=True)
        return Response(serializer.data)


## View 5 - ###############################################
class StudentProfileView5(APIView):
    def get(self, request, *args, **kwargs):
        students = Student.objects.prefetch_related('student_subject', 'gr_student')
        serializer = StudentSerializer5(students, many=True)
        return Response(serializer.data)


## View 6 - ###############################################
class StudentProfileView6(APIView):
    def get(self, request, *args, **kwargs):
        students = Student.objects.prefetch_related('student_subject', 'student_subject__gr_subject')
        serializer = StudentSerializer6(students, many=True)
        return Response(serializer.data)


## View 7 - ##############################################
class StudentProfileView7(APIView):
    def get(self, request, *args, **kwargs):
        students = Student.objects.prefetch_related('student_subject', 'gr_student', 'gr_student__grade_subject')
        serializer = StudentSerializer7(students, many=True)
        return Response(serializer.data)


## View 8 - ##############################################
class StudentProfileView8(APIView):
    def get(self, request, *args, **kwargs):
        students = Student.objects.prefetch_related('student_subject', 'student_subject__subject_grades')
        serializer = StudentSerializer8(students, many=True)
        return Response(serializer.data)
    
## View 9 - #########################################
class StudentProfileView9(APIView):

    def get_student(self, pk):
        try:
            return Student.objects.get(pk=pk)
        except Student.DoesNotExist:
            raise Http404
        

    def get(self, request, pk, *args, **kwargs):
        # students = Student.objects.all()
        # students = [Student.objects.get(pk=1)]
        students = [self.get_student(pk=pk)]
        serializer = StudentSerializer9(students, many=True)
        return Response(serializer.data)


# view to return the list of students that are part of a specific program
class StudentByProgramView(APIView):
    
    def get(self, request, pk):
        subjectId = request.query_params.get('s', 0)
        if (subjectId == 0):
            students = Student.objects.filter(student_academicprogram__id=pk)
        else:
            students = Student.objects.filter(student_academicprogram__id=pk).exclude(student_subject__id=subjectId)
        serializer = StudentSerializer2(students, many=True)
        return Response(serializer.data)



