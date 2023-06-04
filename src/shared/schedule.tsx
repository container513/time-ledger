import { v4 as uuid } from "uuid";
import firebase from "firebase/compat/app";
import moment, { Moment, Duration } from "moment";
import { DocumentData, DocumentReference } from "@firebase/firestore-types";

import Goal from "./goal";
import Subgoal from "./subgoal";
import Task from "./task";

class Schedule {
  static readonly type: string = "schedule";
  id: string;
  goal: Goal;
  subgoal: Subgoal | undefined;
  task: Task;
  date: Moment;
  startTime: Moment | undefined;
  endTime: Moment | undefined;

  constructor(
    goal: Goal,
    subgoal: Subgoal | undefined,
    task: Task,
    date: Moment,
    startTime: Moment | undefined = undefined,
    endTime: Moment | undefined = undefined,
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

  static createFromScheduleData(
    id: string,
    goal: Goal,
    subgoal: Subgoal | undefined,
    task: Task,
    scheduleData: ScheduleData
  ) {
    const startTime =
      scheduleData.startTime === undefined
        ? undefined
        : moment(scheduleData.startTime.toMillis());
    const endTime =
      scheduleData.endTime === undefined
        ? undefined
        : moment(scheduleData.endTime.toMillis());
    return new Schedule(
      goal,
      subgoal,
      task,
      moment(scheduleData.date.toMillis()),
      startTime,
      endTime,
      id
    );
  }

  getScheduleData = (
    taskRef: DocumentReference<DocumentData>
  ): ScheduleData => {
    const res: ScheduleData = {
      type: Schedule.type,
      task: taskRef,
      date: firebase.firestore.Timestamp.fromDate(this.date.toDate()),
    };
    if (this.startTime) {
      res.startTime = firebase.firestore.Timestamp.fromDate(
        this.startTime.toDate()
      );
    }
    if (this.endTime) {
      res.endTime = firebase.firestore.Timestamp.fromDate(
        this.endTime.toDate()
      );
    }
    return res;
  };

  getDuration = (): Duration | undefined => {
    if (!this.startTime || !this.endTime) return undefined;
    return moment.duration(this.endTime.diff(this.startTime));
  };
}

interface ScheduleData {
  type: string;
  task: firebase.firestore.DocumentReference;
  date: firebase.firestore.Timestamp;
  startTime?: firebase.firestore.Timestamp;
  endTime?: firebase.firestore.Timestamp;
}

export default Schedule;
export type { ScheduleData };
