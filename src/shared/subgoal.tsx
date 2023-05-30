import { UUID } from "crypto";

import Task from "./task";

class Subgoal {
  id: UUID;
  goalId: UUID;
  name: string;
  tasks: Task[];
  deadline: Date;
  accumMillisec: number;
  isClosed: boolean;

  constructor(
    id: UUID,
    goalId: UUID,
    name: string,
    tasks: Task[],
    deadline: Date,
    accumMillisec: number,
    isClosed: boolean
  ) {
    this.id = id;
    this.goalId = goalId;
    this.name = name;
    this.tasks = tasks;
    this.deadline = deadline;
    this.accumMillisec = accumMillisec;
    this.isClosed = isClosed;
  }
}

export default Subgoal;
