import { v4 as uuid } from "uuid";
import firebase from "firebase/compat/app";

import Subgoal from "./subgoal";
import Task from "./task";

class Goal {
  static readonly type: string = "goal";
  id: string;
  name: string;
  subgoals: Subgoal[];
  tasks: Task[];
  deadline: Date;
  accumMsec: number;
  isClosed: boolean;

  constructor(
    name: string,
    deadline: Date,
    subgoals: Subgoal[] = [],
    tasks: Task[] = [],
    accumMsec: number = 0,
    isClosed: boolean = false,
    id?: string
  ) {
    this.id = id !== undefined ? id : uuid();
    this.name = name;
    this.subgoals = subgoals;
    this.tasks = tasks;
    this.deadline = deadline;
    this.accumMsec = accumMsec;
    this.isClosed = isClosed;
  }
}

interface GoalData {
  type: string;
  name: string;
  subgoals: Subgoal[];
  tasks: Task[];
  deadline: firebase.firestore.Timestamp;
  accumMsec: number;
  isClosed: boolean;
}

export default Goal;
export type { GoalData };
