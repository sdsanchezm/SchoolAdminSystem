from django.contrib import admin
from .models import Student, Institution, Teacher, AcademicProgram, Subject, Grade

# Register your models here.

class StudentAdmin(admin.ModelAdmin):
    list_display = ("pk", "student_firstname", "student_lastname", "student_number")


class InstitutionAdmin(admin.ModelAdmin):
    list_display = ("pk", "institution_name", "institution_number")


class TeacherAdmin(admin.ModelAdmin):
    list_display = ("pk", "teacher_firstname", "teacher_lastname", "teacher_number")


class AcademicProgramAdmin(admin.ModelAdmin):
    list_display = ("pk", "academicprogram_name", "academicprogram_number")


class SubjectAdmin(admin.ModelAdmin):
    list_display = ("pk", "subject_name", "subject_number")


class GradeAdmin(admin.ModelAdmin):
    list_display = ("pk", "grade_student", "grade_subject", "grade_e1", "grade_e2", "grade_e3", "grade_ef", "grade_date")


admin.site.register(Student, StudentAdmin)
admin.site.register(Institution, InstitutionAdmin)
admin.site.register(Teacher, TeacherAdmin)
admin.site.register(AcademicProgram, AcademicProgramAdmin)
admin.site.register(Subject, SubjectAdmin)
admin.site.register(Grade, GradeAdmin)