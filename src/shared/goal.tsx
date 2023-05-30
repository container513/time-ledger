import { UUID } from "crypto";

import Subgoal from "./subgoal";

class Goal {
  id: UUID;
  name: string;
  subgoals: Subgoal[];
  deadline: Date;
  accumMillisec: number;
  isClosed: boolean;

  constructor(
    id: UUID,
    name: string,
    subgoals: Subgoal[],
    deadline: Date,
    accumMillisec: number,
    isClosed: boolean
  ) {
    this.id = id;
    this.name = name;
    this.subgoals = subgoals;
    this.deadline = deadline;
    this.accumMillisec = accumMillisec;
    this.isClosed = isClosed;
  }
}

export default Goal;
