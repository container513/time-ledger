import { UUID } from "crypto";

class Schedule {
  id: UUID;
  taskId: UUID;
  date: Date;
  startTime: Date;
  endTime: Date;

  constructor(
    id: UUID,
    taskId: UUID,
    date: Date,
    startTime: Date,
    endTime: Date
  ) {
    this.id = id;
    this.taskId = taskId;
    this.date = date;
    this.startTime = startTime;
    this.endTime = endTime;
  }
}

export default Schedule;
