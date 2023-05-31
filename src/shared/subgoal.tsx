import { v4 as uuid } from "uuid";

import Task from "./task";

class Subgoal {
  static readonly type: string = "subgoal";
  id: string;
  goalId: string;
  name: string;
  tasks: Task[];
  deadline: Date;
  accumMsec: number;
  isClosed: boolean;

  constructor(
    name: string,
    goalId: string,
    deadline: Date,
    tasks: Task[] = [],
    accumMsec: number = 0,
    isClosed: boolean = false,
    id?: string
  ) {
    this.id = id !== undefined ? id : uuid();
    this.goalId = goalId;
    this.name = name;
    this.tasks = tasks;
    this.deadline = deadline;
    this.accumMsec = accumMsec;
    this.isClosed = isClosed;
  }
}

export default Subgoal;
