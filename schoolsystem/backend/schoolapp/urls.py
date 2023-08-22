from django.urls import path
from . import views
from .viewsall.Institution_view import InstitutionView, InstitutionList
from .viewsall.AcademicProgram_view import AcademicProgramView, AcademicProgramList, AcademicProgramListReduced, AcademicProgramNewView, AcademicProgramProfileView
from .viewsall.Subject_view import SubjectView, SubjectList, SubjectNewView
from .viewsall.Teacher_view import TeacherView, TeacherList, TeacheNewView
from .viewsall.Grade_view import GradeViewAll, GradeViewItem
from .viewsall.Dashboard_view import DashboardView

urlpatterns = [
    path('home/', views.HomeView.as_view(), name='home'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
    path('institution/', InstitutionList.as_view(), name='institutionlist'),
    path('institution/<int:pk>', InstitutionView.as_view(), name='institution'),
    path('academicprogram/', AcademicProgramList.as_view(), name='academicprogramlist'),
    path('academicprogram/reduced', AcademicProgramListReduced.as_view(), name='academicprogramlistreduced'),
    path('academicprogram/new/', AcademicProgramNewView.as_view(), name='academicprogramnew'),
    path('academicprogram/<int:pk>', AcademicProgramView.as_view(), name='academicprogram'),
    path('subject/', SubjectList.as_view(), name='subjectlist'),
    path('subject/new/', SubjectNewView.as_view(), name='subjectnew'),
    path('subject/<int:pk>', SubjectView.as_view(), name='subject'),
    path('programprofile/<int:pk>', AcademicProgramProfileView.as_view(), name='subjectprofile'),
    path('student/', views.StudentList.as_view(), name='studentlist'),
    path('student/<int:pk>', views.StudentView.as_view(), name='student'),
    path('studentupdate/<int:pk>', views.StudentUpdateView.as_view(), name='studentupdate'),
    path('studentprofile/<int:pk>', views.StudentProfileView9.as_view(), name='studentprofile'),
    path('teacher/', TeacherList.as_view(), name='teacherlist'),
    path('teacher/new/', TeacheNewView.as_view(), name='teachernew'),
    path('teacher/<int:pk>', TeacherView.as_view(), name='teacher'),
    path('test2/', views.TestViewB.as_view(), name='test2'),
    path('studentbysubject/', views.StudentSubjectView1.as_view(), name='studentbysubject'),
    path('studentbysubject/<int:pk>', views.StudentSubjectViewItem.as_view(), name='studentbysubjectitem'),
    path('studentbyprogram/<int:pk>', views.StudentByProgramView.as_view(), name='studentbyprogram'),
    path('grade/', GradeViewAll.as_view(), name='gradeall'),
    path('grade/<int:pk>', GradeViewItem.as_view(), name='gradeitem'),
    path('dashboard/', DashboardView.as_view(), name='dashboard'),
]
