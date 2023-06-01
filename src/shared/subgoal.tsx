import { v4 as uuid } from "uuid";
import firebase from "firebase/compat/app";

import Task from "./task";
import Goal from "./goal";

class Subgoal {
  static readonly type: string = "subgoal";
  id: string;
  goal: Goal;
  name: string;
  tasks: Task[];
  deadline: Date;
  accumMsec: number;
  isClosed: boolean;

  constructor(
    name: string,
    goal: Goal,
    deadline: Date,
    tasks: Task[] = [],
    accumMsec: number = 0,
    isClosed: boolean = false,
    id?: string
  ) {
    this.id = id !== undefined ? id : uuid();
    this.goal = goal;
    this.name = name;
    this.tasks = tasks;
    this.deadline = deadline;
    this.accumMsec = accumMsec;
    this.isClosed = isClosed;
  }
}

interface SubgoalData {
  type: string;
  goal: firebase.firestore.DocumentReference;
  name: string;
  tasks: firebase.firestore.DocumentReference[];
  deadline: firebase.firestore.Timestamp;
  accumMsec: number;
  isClosed: boolean;
}

export default Subgoal;
export type { SubgoalData };
