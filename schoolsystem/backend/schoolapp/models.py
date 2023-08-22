# from django.contrib.auth.models import AbstractUser
from datetime import datetime
from django.db import models

# Create your models here.

class Institution(models.Model):
    institution_name = models.CharField(max_length=100, default=None, blank=False, null=False)
    institution_number = models.IntegerField(null=False, unique=True)

    def __str__(self):
        return f"{self.institution_name} {self.institution_number}"


class Teacher(models.Model):
    teacher_firstname = models.CharField(max_length=100, default=None, blank=False, null=False)
    teacher_lastname = models.CharField(max_length=100, default=None, blank=False, null=False)
    teacher_number = models.IntegerField(null=False, unique=True)
    teacher_institution = models.ForeignKey(Institution, on_delete=models.CASCADE, related_name="te_institution", blank=True)

    def __str__(self):
        return f"{self.teacher_firstname} {self.teacher_lastname} {self.teacher_number}"


class AcademicProgram(models.Model):
    academicprogram_name = models.CharField(max_length=100, default=None, blank=False, null=False)
    academicprogram_number = models.IntegerField(null=False, unique=True)
    academicprogram_institution = models.ForeignKey(Institution, on_delete=models.CASCADE, related_name="ac_institution")

    def __str__(self):
        return f"{self.academicprogram_name} {self.academicprogram_number}"


class Subject(models.Model):
    subject_name = models.CharField(max_length=100, default=None, blank=False, null=False)
    subject_number = models.IntegerField(null=False, unique=True)
    subject_teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, related_name="su_teacher")
    subject_academicprogram = models.ForeignKey(AcademicProgram, on_delete=models.CASCADE, related_name="su_academicprogram")

    def __str__(self):
        return f"{self.subject_name} {self.subject_number}"


class Grade(models.Model):
    grade_student = models.ForeignKey('Student', on_delete=models.CASCADE, related_name="gr_student", blank=True, default=None, null=True)
    grade_subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name="gr_subject", blank=True, default=None, null=True)
    grade_teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, related_name="gr_teacher", blank=True, default=None, null=True)
    grade_e1 = models.FloatField(null=False, blank=False, default=0.0)
    grade_e2 = models.FloatField(null=False, blank=False, default=0.0)
    grade_e3 = models.FloatField(null=False, blank=False, default=0.0)
    grade_ef = models.FloatField(null=False, blank=False, default=0.0)
    grade_date = models.DateTimeField(default=datetime.now)

    def __str__(self):
        # return f"{self.grade_student} {self.grade_subject} {self.grade_teacher} {self.grade_e1} {self.grade_e2} {self.grade_e3} {self.grade_ef}"
        return f"{self.id} {self.grade_e1} {self.grade_e2} {self.grade_e3} {self.grade_ef}"


class Student(models.Model):
    student_firstname = models.CharField(max_length=100, default=None, blank=True, null=True)
    student_lastname = models.CharField(max_length=100, default=None, blank=True, null=True)
    student_number = models.IntegerField(default=0)
    student_subject = models.ManyToManyField(Subject, blank=True, related_name="st_subject")
    student_institution = models.ForeignKey(Institution, on_delete=models.CASCADE, related_name="st_institution", blank=True, default=None, null=True)
    student_academicprogram = models.ForeignKey(AcademicProgram, on_delete=models.CASCADE, related_name="st_academicprogram", blank=True, default=None, null=True)
        
    def __str__(self):
        return f"{self.student_firstname} {self.student_lastname} {self.student_number} {self.student_subject}"
        