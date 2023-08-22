from ..models import Grade
from django.shortcuts import render
from ..serializersall.GradeSerializer import GradeSerializer, GradePublicSerializerAll
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
# from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status



class GradeViewItem(APIView):
    """
    Class to handle Subjects Data
    """
    
    def get_grade(self, pk):
        try:
            return Grade.objects.get(pk=pk)
        except Grade.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        grade = self.get_grade(pk)
        serializer = GradePublicSerializerAll(grade)
        return Response(serializer.data)

# First Definition of the Put method, old structure
    # def put(self, request, pk, format=None):
    #     # grade = self.get_grade(pk)
    #     data1 = request.data
    #     student_id = data1.get('student_id')
    #     subject_id = data1.get('subject_id')
    #     grades = data1.get('grades')
    #     # print(grades.get('grade_e1'))
    #     # gradesdata = {'grade_e1': grades.get('grade_e1'), 'grade_e2': grades.get('grade_e2'), 'grade_e3': grades.get('grade_e3'), 'grade_ef': grades.get('grade_ef')}
    #     gradesdata = dict(grades)
    #     grade = Grade.objects.filter(grade_student__id=student_id, grade_subject__id=subject_id).first()
    #     serializer = GradePublicSerializerAll(grade, data=gradesdata)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# New definition of PUT method
    def put(self, request, pk, format=None):
        grade = self.get_grade(pk)
        serializer = GradePublicSerializerAll(grade, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        subject = self.get_grade(pk)
        subject.delete()
        return Response({"message":"record deleted"}, status=status.HTTP_204_NO_CONTENT)


class GradeViewAll(APIView):
    """
    This is the SubjectList view
    """
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request, format=None):
        studentId = request.query_params.get('st', 'a')
        subjectId = request.query_params.get('sb', 'b')

        # print( studentId.isdigit() )

        if studentId.isdigit() and subjectId.isdigit():
            grade = Grade.objects.filter(grade_student__id=studentId, grade_subject__id=subjectId)
            # studentId = int(studentId)
        else:
            grade = Grade.objects.all()

        # if type(studentId) == int:
        #     grade = Grade.objects.filter(grade_student__id=studentId)
        # else:
        #     grade = Grade.objects.all()

        # print(studentId)
        # print(subjectId)
        # print(type(studentId))
        # print(type(subjectId))
        # grade = Grade.objects.select_related('subject_teacher').all()
        serializer = GradePublicSerializerAll(grade, many=True)
        return Response(serializer.data)
    
    def post(self, request, format=None):
        serializer = GradePublicSerializerAll(data=request.data)
        if serializer.is_valid():
            # serializer.save()
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
    def perform_create(self, serializer):
        serializer.save()