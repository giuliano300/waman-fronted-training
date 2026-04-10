import { Classrooms } from "./Classrooms";
import { CompleteWorkerTraining } from "./CompleteWorkerTraining";
import { TeacherPlannings } from "./TeacherPlannings";
import { Teachers } from "./Teachers";

export interface CompleteTeacherPlanning {
  planning: TeacherPlannings;
  teacher: Teachers;
  classroom: Classrooms;
  completeWt: CompleteWorkerTraining[];
}