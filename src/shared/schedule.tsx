import { UUID, randomUUID } from "crypto";

class Schedule {
  id: UUID;
  taskId: UUID;
  date: Date;
  startTime: Date | undefined;
  endTime: Date | undefined;

  constructor(
    taskId: UUID,
    date: Date,
    startTime: Date | undefined = undefined,
    endTime: Date | undefined = undefined,
    id?: UUID
  ) {
    this.id = id !== undefined ? id : randomUUID();
    this.taskId = taskId;
    this.date = date;
    this.startTime = startTime;
    this.endTime = endTime;
  }
}

export default Schedule;
