import { v4 as uuid } from "uuid";

class Schedule {
  static readonly type: string = "schedule";
  id: string;
  taskId: string;
  date: Date;
  startTime: Date | undefined;
  endTime: Date | undefined;

  constructor(
    taskId: string,
    date: Date,
    startTime: Date | undefined = undefined,
    endTime: Date | undefined = undefined,
    id?: string
  ) {
    this.id = id !== undefined ? id : uuid();
    this.taskId = taskId;
    this.date = date;
    this.startTime = startTime;
    this.endTime = endTime;
  }
}

export default Schedule;
