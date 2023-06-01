import { v4 as uuid } from "uuid";
import firebase from "firebase/compat/app";

import Goal from "./goal";
import Subgoal from "./subgoal";
import Task from "./task";

class Schedule {
  static readonly type: string = "schedule";
  id: string;
  goal: Goal;
  subgoal: Subgoal | undefined;
  task: Task;
  date: Date;
  startTime: Date | undefined;
  endTime: Date | undefined;

  constructor(
    goal: Goal,
    subgoal: Subgoal | undefined,
    task: Task,
    date: Date,
    startTime: Date | undefined = undefined,
    endTime: Date | undefined = undefined,
    id?: string
  ) {
    this.id = id !== undefined ? id : uuid();
    this.goal = goal;
    this.subgoal = subgoal;
    this.task = task;
    this.date = date;
    this.startTime = startTime;
    this.endTime = endTime;
  }
}

interface ScheduleData {
  type: string;
  task: firebase.firestore.DocumentReference;
  subgoal?: firebase.firestore.DocumentReference;
  goal: firebase.firestore.DocumentReference;
  date: firebase.firestore.Timestamp;
  startTime?: firebase.firestore.Timestamp;
  endTime?: firebase.firestore.Timestamp;
}

export default Schedule;
export type { ScheduleData };
