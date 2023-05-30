import { UUID, randomUUID } from "crypto";

import Subgoal from "./subgoal";
import Task from "./task";

class Goal {
  static readonly type: string = "goal";
  id: UUID;
  name: string;
  subgoals: Subgoal[];
  tasks: Task[];
  deadline: Date;
  accumMillisec: number;
  isClosed: boolean;

  constructor(
    name: string,
    deadline: Date,
    subgoals: Subgoal[] = [],
    tasks: Task[] = [],
    accumMillisec: number = 0,
    isClosed: boolean = false,
    id?: UUID
  ) {
    this.id = id !== undefined ? id : randomUUID();
    this.name = name;
    this.subgoals = subgoals;
    this.tasks = tasks;
    this.deadline = deadline;
    this.accumMillisec = accumMillisec;
    this.isClosed = isClosed;
  }
}

export default Goal;
