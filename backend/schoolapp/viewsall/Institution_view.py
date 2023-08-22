from ..models import Institution
from django.shortcuts import render
from ..serializersall.InstitutionSerializer import InstitutionSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
# from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status


class TestView(APIView):

    def get(self, request):
        content = {"message": "welcome to test of institutions"}
        return Response(content)
    

class InstitutionView(APIView):
    """
    Class to handle Institution Data
    """
    
    def get_institution(self, pk):
        try:
            return Institution.objects.get(pk=pk)
        except Institution.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        institution = self.get_institution(pk)
        serializer = InstitutionSerializer(institution)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        institution = self.get_institution(pk)
        serializer = InstitutionSerializer(institution, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        institution = self.get_institution(pk)
        institution.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class InstitutionList(APIView):
    """
    This is the Institution view
    """
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request, format=None):
        institution = Institution.objects.all()
        serializer = InstitutionSerializer(institution, many=True)
        return Response(serializer.data)
    
    def post(self, request, format=None):
        serializer = InstitutionSerializer(data=request.data)
        if serializer.is_valid():
            # serializer.save()
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
    def perform_create(self, serializer):
        serializer.save()

