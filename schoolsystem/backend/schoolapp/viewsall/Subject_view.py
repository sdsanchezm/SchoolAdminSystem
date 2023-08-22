from ..models import Subject
from django.shortcuts import render
from ..serializersall.SubjectSerializer import SubjectSerializer, SubjectCreateSerializer, SubjectPublicSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
# from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status



class SubjectView(APIView):
    """
    Class to handle Subjects Data
    """
    
    def get_subject(self, pk):
        try:
            return Subject.objects.get(pk=pk)
        except Subject.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        subject = self.get_subject(pk)
        serializer = SubjectSerializer(subject)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        temp = request.body
        print(temp)
        print(pk)
        subject = self.get_subject(pk)
        serializer = SubjectSerializer(subject, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        subject = self.get_subject(pk)
        subject.delete()
        return Response({"message":"record deleted"}, status=status.HTTP_204_NO_CONTENT)


class SubjectList(APIView):
    """
    This is the SubjectList view
    """
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request, format=None):
        # subject = Subject.objects.all()
        subject = Subject.objects.select_related('subject_teacher').all()
        serializer = SubjectPublicSerializer(subject, many=True)
        return Response(serializer.data)
    
    def post(self, request, format=None):
        serializer = SubjectSerializer(data=request.data)
        if serializer.is_valid():
            # serializer.save()
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
    def perform_create(self, serializer):
        serializer.save()


class SubjectNewView(APIView):

    # serializer_class = SubjectCreateSerializer

    def post(self, request, format=None):
        serializer = SubjectCreateSerializer(data=request.data)
        if serializer.is_valid():
            # serializer.save()
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def perform_create(self, serializer):
        serializer.save()