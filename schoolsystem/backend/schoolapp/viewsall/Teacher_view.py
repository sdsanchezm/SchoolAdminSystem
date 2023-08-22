from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
# from rest_framework_simplejwt.tokens import RefreshToken
from ..models import Teacher
from django.shortcuts import render
from ..serializersall.TeacherSerializer import TeacherSerializer, TeacherCreateSerializer
from django.http import Http404



class TeacherView(APIView):
    """
    Class to handle Teacher Data
    """
    
    def get_teacher(self, pk):
        try:
            return Teacher.objects.get(pk=pk)
        except Teacher.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        teacher = self.get_teacher(pk)
        serializer = TeacherSerializer(teacher)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        teacher = self.get_teacher(pk)
        serializer = TeacherSerializer(teacher, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        teacher = self.get_teacher(pk)
        teacher.delete()
        return Response({"message":"record deleted"}, status=status.HTTP_204_NO_CONTENT)


class TeacherList(APIView):
    """
    This is the TeacherList view
    """
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request, format=None):
        teacher = Teacher.objects.all()
        serializer = TeacherSerializer(teacher, many=True)
        return Response(serializer.data)
    
    def post(self, request, format=None):
        serializer = TeacherSerializer(data=request.data)
        if serializer.is_valid():
            # serializer.save()
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
    def perform_create(self, serializer):
        serializer.save()


class TeacheNewView(APIView):

    serializer_class = TeacherCreateSerializer

    def post(self, request, format=None):
        serializer = TeacherCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)