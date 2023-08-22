from ..models import Institution, Teacher, Student, Subject, AcademicProgram
from django.shortcuts import render
from ..serializersall.InstitutionSerializer import InstitutionSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
# from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status



class DashboardView(APIView):
    """
    Class to handle Institution Data
    """
    
    def get_institution(self, pk):
        try:
            return Institution.objects.get(pk=pk)
        except Institution.DoesNotExist:
            raise Http404

    def get(self, request, format=None):
        institutionCount = Institution.objects.all().count()
        teacherCount = Teacher.objects.all().count()
        studentCount = Student.objects.all().count()
        academicprogramCount = AcademicProgram.objects.all().count()
        subjectCount = Subject.objects.all().count()

        obj1 = {
            'institution_count': institutionCount,
            'teacher_count': teacherCount,
            'student_count': studentCount,
            'academicprogram_count': academicprogramCount,
            'subject_count': subjectCount
            }
        return Response(obj1)




