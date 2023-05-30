import { UUID, randomUUID } from "crypto";

import Task from "./task";

class Subgoal {
  static readonly type: string = "subgoal";
  id: UUID;
  goalId: UUID;
  name: string;
  tasks: Task[];
  deadline: Date;
  accumMsec: number;
  isClosed: boolean;

  constructor(
    name: string,
    goalId: UUID,
    deadline: Date,
    tasks: Task[] = [],
    accumMsec: number = 0,
    isClosed: boolean = false,
    id: UUID
  ) {
    this.id = id !== undefined ? id : randomUUID();
    this.goalId = goalId;
    this.name = name;
    this.tasks = tasks;
    this.deadline = deadline;
    this.accumMsec = accumMsec;
    this.isClosed = isClosed;
  }
}

export default Subgoal;
