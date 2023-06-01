import { v4 as uuid } from "uuid";
import firebase from "firebase/compat/app";

import Schedule, { ScheduleData } from "./schedule";
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

  static async createFromTaskData(
    id: string,
    parent: Goal | Subgoal,
    taskData: TaskData
  ): Promise<Task> {
    const subgoal = parent instanceof Subgoal ? parent : undefined;
    const goal = parent instanceof Goal ? parent : subgoal!.goal;
    const newTask = new Task(
      taskData.name,
      parent,
      [],
      taskData.accumMsec,
      taskData.isClosed,
      id
    );

    // get schedules
    const fetchPromises = taskData.schedules.map(async (scheduleRef) => {
      const snapshot = await scheduleRef.get();
      return {
        scheduleId: scheduleRef.id,
        scheduleData: snapshot.data() as ScheduleData,
      };
    });
    const snapshotsWithId = await Promise.all(fetchPromises);
    const schedules = snapshotsWithId.map(({ scheduleId, scheduleData }) => {
      return Schedule.createFromScheduleData(
        scheduleId,
        goal,
        subgoal,
        newTask,
        scheduleData
      );
    });
    newTask.schedules = schedules;
    return newTask;
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
