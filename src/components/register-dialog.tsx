import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { courses, currentStudent } from "@/lib/mock-data";
import type { Enrollment } from "@/lib/types";

type RegisterDialogProps = {
  enrollments: Enrollment[];
  onEnroll: (courseId: string, enrolledAt: string) => void;
};

export function RegisterDialog({ enrollments, onEnroll }: RegisterDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");

  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const [selectedTime, setSelectedTime] = useState<string>(getCurrentTime());

  const availableCourses = courses.filter(
    (course) =>
      !enrollments.some(
        (e) =>
          e.studentId === currentStudent.studentId &&
          e.courseId === course.courseId
      )
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedCourseId) return;

    const now = new Date();
    const [hours, minutes] = selectedTime.split(":");
    now.setHours(parseInt(hours, 10), parseInt(minutes, 10));

    onEnroll(selectedCourseId, now.toISOString());

    setSelectedCourseId("");
    setSelectedTime(getCurrentTime());
    setOpen(false);
  }

  const selectedCourse = courses.find((c) => c.courseId === selectedCourseId);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button type="button">ลงทะเบียน</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-full overflow-hidden">
          <DialogHeader>
            <DialogTitle>ลงทะเบียนเรียน</DialogTitle>
            <DialogDescription>
              เลือกวิชาที่ต้องการลงทะเบียน แล้วกรอกข้อมูลให้ครบ
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2 w-full min-w-0">
            <Label htmlFor="course">วิชา</Label>
            <Select
              value={selectedCourseId}
              onValueChange={(val) => setSelectedCourseId(val ?? "")}
            >
              <SelectTrigger id="course" className="w-full min-w-0">
                <span className="truncate text-left block w-full pr-2">
                  <SelectValue placeholder="เลือกวิชา">
                    {selectedCourse
                      ? `${selectedCourse.courseId} - ${selectedCourse.courseTitle}`
                      : undefined}
                  </SelectValue>
                </span>
              </SelectTrigger>
              <SelectContent>
                {availableCourses.map((course) => (
                  <SelectItem key={course.courseId} value={course.courseId}>
                    {course.courseId} - {course.courseTitle}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">เวลา</Label>
            <Input
              id="time"
              type="time"
              className="w-full"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="studentName">ชื่อ นศ.</Label>
            <Input
              id="studentName"
              className="w-full"
              value={`${currentStudent.firstName} ${currentStudent.lastName}`}
              readOnly
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="program">โปรแกรม</Label>
            <Input
              id="program"
              className="w-full"
              value={currentStudent.program}
              readOnly
            />
          </div>

          <DialogFooter className="pt-4 border-t border-border mt-6">
            <Button type="submit" disabled={!selectedCourseId}>
              ยืนยันการลงทะเบียน
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}