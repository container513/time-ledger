import { v4 as uuid } from "uuid";
import firebase from "firebase/compat/app";

import Schedule from "./schedule";
import Subgoal from "./subgoal";
import Goal from "./goal";

class Task {
  static readonly type: string = "task";
  id: string;
  parent: Subgoal | Goal;
  name: string;
  schedules: Schedule[];
  accumMsec: number;
  isClosed: boolean;

  constructor(
    name: string,
    parent: Subgoal | Goal,
    schedules: Schedule[] = [],
    accumMsec: number = 0,
    isClosed: boolean = false,
    id?: string
  ) {
    this.id = id !== undefined ? id : uuid();
    this.parent = parent;
    this.name = name;
    this.schedules = schedules;
    this.accumMsec = accumMsec;
    this.isClosed = isClosed;
  }
}

interface TaskData {
  type: string;
  parent: firebase.firestore.DocumentReference;
  name: string;
  schedules: firebase.firestore.DocumentReference[];
  accumMsec: number;
  isClosed: boolean;
}

export default Task;
export type { TaskData };
