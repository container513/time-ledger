import { UUID, randomUUID } from "crypto";

import Subgoal from "./subgoal";

class Goal {
  id: UUID;
  name: string;
  subgoals: Subgoal[];
  deadline: Date;
  accumMillisec: number;
  isClosed: boolean;

  constructor(
    name: string,
    deadline: Date,
    subgoals: Subgoal[] = [],
    accumMillisec: number = 0,
    isClosed: boolean = false,
    id?: UUID
  ) {
    this.id = id !== undefined ? id : randomUUID();
    this.name = name;
    this.subgoals = subgoals;
    this.deadline = deadline;
    this.accumMillisec = accumMillisec;
    this.isClosed = isClosed;
  }
}

export default Goal;
