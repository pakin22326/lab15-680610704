import type { Course, Student } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

type CourseCardProps = {
  course: Course;
  student: Student;
  enrolledAt?: string;
  isEnrolled?: boolean;
  onUnenroll?: (courseId: string) => void;
};

export function CourseCard({
  course,
  student,
  enrolledAt,
  isEnrolled = false,
  onUnenroll,
}: CourseCardProps) {
  const formatEnrolledDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleString("th-TH", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <Card className="relative">
      <CardHeader className="pr-32">
        <CardTitle className="text-base font-semibold">{course.courseTitle}</CardTitle>
        <CardDescription className="text-xs">
          รหัสวิชา: {course.courseId} · ผู้สอน: {course.instructors.join(", ")}
        </CardDescription>

        <div className="absolute top-6 right-6">
          {isEnrolled ? (
            <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-[#451a03] dark:text-[#a855f7] dark:hover:bg-[#451a03] border-none font-normal px-2.5 py-0.5 text-xs">
              ลงทะเบียนแล้ว
            </Badge>
          ) : (
            <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100 dark:bg-[#521b00] dark:text-[#facc15] dark:hover:bg-[#521b00] border-none font-normal px-2.5 py-0.5 text-xs">
              เปิดรับ
            </Badge>
          )}
        </div>
      </CardHeader>

      {isEnrolled && (
        <CardContent className="flex items-end justify-between pt-0">
          <div className="text-xs text-muted-foreground space-y-1">
            <p>
              ชื่อ นศ.: {student.firstName} {student.lastName}
            </p>
            <p>โปรแกรม: {student.program}</p>
            <p>ลงทะเบียนเมื่อ: {formatEnrolledDate(enrolledAt)}</p>
          </div>

          {onUnenroll && (
            <Button
              variant="ghost"
              size="icon"
              className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8"
              onClick={() => onUnenroll(course.courseId)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </CardContent>
      )}
    </Card>
  );
}