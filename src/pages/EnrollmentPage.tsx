import { useState } from "react";
import { CourseCard } from "@/components/course-card";
import { RegisterDialog } from "@/components/register-dialog";
import {
  courses,
  currentStudent,
  enrollments as initialEnrollments,
} from "@/lib/mock-data";
import type { Enrollment } from "@/lib/types";

export default function EnrollmentPage() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>(initialEnrollments);

  const handleEnroll = (courseId: string, enrolledAt: string) => {
    const newEnrollment: Enrollment = {
      studentId: currentStudent.studentId,
      courseId,
      enrolledAt,
    };
    setEnrollments((prev) => [...prev, newEnrollment]);
  };

  const handleUnenroll = (courseId: string) => {
    setEnrollments((prev) =>
      prev.filter(
        (item) =>
          !(
            item.studentId === currentStudent.studentId &&
            item.courseId === courseId
          )
      )
    );
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] justify-between space-y-6">
      <div className="space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">รายวิชาทั้งหมด</h1>
            <p className="text-sm text-muted-foreground">
              {currentStudent.firstName} {currentStudent.lastName} ({currentStudent.studentId})
            </p>
          </div>
          <RegisterDialog
            enrollments={enrollments}
            onEnroll={handleEnroll}
          />
        </div>

        <div className="flex flex-col gap-4">
          {courses.map((course) => {
            const userEnrollment = enrollments.find(
              (item) =>
                item.studentId === currentStudent.studentId &&
                item.courseId === course.courseId
            );
            const isEnrolled = !!userEnrollment;

            return (
              <CourseCard
                key={course.courseId}
                course={course}
                student={currentStudent}
                isEnrolled={isEnrolled}
                enrolledAt={userEnrollment?.enrolledAt}
                onUnenroll={handleUnenroll}
              />
            );
          })}
        </div>
      </div>

      <footer className="py-4 text-center text-xs text-muted-foreground border-t">
        จัดทำโดย {currentStudent.firstName} {currentStudent.lastName} รหัสนักศึกษา {currentStudent.studentId}
      </footer>
    </div>
  );
}