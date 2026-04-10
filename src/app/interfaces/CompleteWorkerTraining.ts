import { Classrooms } from "./Classrooms";
import { Teachers } from "./Teachers";
import { Workers } from "./Workers";
import { WorkerTrainings } from "./WorkerTrainings";

export interface CompleteWorkerTraining {
  training: WorkerTrainings;
  worker: Workers;
  classroom: Classrooms;
  teacher: Teachers;
}