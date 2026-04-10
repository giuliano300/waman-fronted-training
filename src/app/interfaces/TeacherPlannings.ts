export interface TeacherPlannings {
  id: number;
  classroomId: number;
  teacherId: number;
  day_1: Date;
  day_2: Date;
  day_3: Date;
  coursesName: string;
  pathFile: string;
  pathFileSigned: string;
  make: boolean;
  deleted: boolean;
}