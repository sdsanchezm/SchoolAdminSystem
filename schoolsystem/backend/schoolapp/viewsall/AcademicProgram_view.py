from django.shortcuts import render
from django.http import Http404
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from ..models import AcademicProgram, Subject
from ..serializersall.AcademicProgramSerializer import AcademicProgramSerializer, AcademicProgramPublicSerializerAll, AcademicProgramPublicSerializer, AcademicProgramNewSerializer, AcademicProgramProfileSerializer
# from rest_framework_simplejwt.tokens import RefreshToken



class AcademicProgramView(APIView):
    """
    Class to handle academicprogram Data
    """
    
    def get_academicprogram(self, pk):
        try:
            return AcademicProgram.objects.get(pk=pk)
        except AcademicProgram.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        academicprogram = self.get_academicprogram(pk)
        # serializer = AcademicProgramSerializer(academicprogram)
        serializer = AcademicProgramPublicSerializer(academicprogram)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        academicprogram = self.get_academicprogram(pk)
        serializer = AcademicProgramSerializer(academicprogram, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        academicprogram = self.get_academicprogram(pk)
        academicprogram.delete()
        return Response({"message":"record deleted"}, status=status.HTTP_204_NO_CONTENT)


class AcademicProgramList(APIView):
    """
    This is the academicprogramList view
    """
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request, format=None):
        # academicprogram = AcademicProgram.objects.all()
        academicprogram = AcademicProgram.objects.select_related('academicprogram_institution').all()
        # academicprogram = AcademicProgram.objects.select_related('a_teacher').all()
        serializer = AcademicProgramPublicSerializer(academicprogram, many=True)
        return Response(serializer.data)
    
    def post(self, request, format=None):
        serializer = AcademicProgramSerializer(data=request.data)
        if serializer.is_valid():
            # serializer.save()
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
    def perform_create(self, serializer):
        serializer.save()


class AcademicProgramListReduced(APIView):
    """
    This is the academicprogramList view
    """
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request, format=None):
        # academicprogram = AcademicProgram.objects.all()
        academicprogram = AcademicProgram.objects.select_related('academicprogram_institution').all()
        # academicprogram = AcademicProgram.objects.select_related('a_teacher').all()
        serializer = AcademicProgramPublicSerializerAll(academicprogram, many=True)
        return Response(serializer.data)
    
    def post(self, request, format=None):
        serializer = AcademicProgramSerializer(data=request.data)
        if serializer.is_valid():
            # serializer.save()
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
    def perform_create(self, serializer):
        serializer.save()


class AcademicProgramNewView(APIView):

    serializer_class = AcademicProgramNewSerializer

    def post(self, request, format=None):
        serializer = AcademicProgramNewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AcademicProgramProfileView(APIView):

    def get(self, request, pk, format=None):
        subjects = Subject.objects.filter(subject_academicprogram__id=pk)
        serializer = AcademicProgramProfileSerializer(subjects, many=True)
        return Response(serializer.data)



