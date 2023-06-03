import { v4 as uuid } from "uuid";
import firebase from "firebase/compat/app";
import moment, { Duration } from "moment";

import Schedule from "./schedule";
import Subgoal from "./subgoal";
import Goal from "./goal";
import { docRefsToSchedule } from "./utils";
import { ReviewStats, Reviewable } from "./reviewStats";

class Task implements Reviewable {
  static readonly type: string = "task";
  id: string;
  parent: Subgoal | Goal;
  name: string;
  schedules: { [key: string]: Schedule };
  isClosed: boolean;

  constructor(
    name: string,
    parent: Subgoal | Goal,
    schedules: { [key: string]: Schedule } = {},
    isClosed: boolean = false,
    id?: string
  ) {
    this.id = id !== undefined ? id : uuid();
    this.parent = parent;
    this.name = name;
    this.schedules = schedules;
    this.isClosed = isClosed;
  }

  static async createFromTaskData(
    id: string,
    parent: Goal | Subgoal,
    taskData: TaskData
  ): Promise<Task> {
    const subgoal = parent instanceof Subgoal ? parent : undefined;
    const goal = parent instanceof Goal ? parent : subgoal!.goal;
    const newTask = new Task(taskData.name, parent, {}, taskData.isClosed, id);
    const schedules = await docRefsToSchedule(
      goal,
      subgoal,
      newTask,
      taskData.schedules
    );
    newTask.schedules = Object.fromEntries(
      schedules.map((schd) => [schd.id, schd])
    );
    return newTask;
  }

  getReviewStats = (): ReviewStats => {
    const closedSchds = Object.values(this.schedules).filter(
      (schd) => schd.startTime && schd.endTime && schd.endTime < moment()
    );
    const revStats = new ReviewStats(this);
    if (closedSchds.length > 0) {
      revStats.actualEffort = closedSchds.reduce(
        (acc: Duration, schd: Schedule) => {
          return acc.add(schd.getDuration());
        },
        moment.duration(0)
      );
      revStats.startDate = moment.min(
        closedSchds.map((schd) => schd.startTime!)
      );
      revStats.endDate = moment.max(closedSchds.map((schd) => schd.endTime!));
    }
    return revStats;
  };
}

interface TaskData {
  type: string;
  parent: firebase.firestore.DocumentReference;
  name: string;
  schedules: firebase.firestore.DocumentReference[];
  isClosed: boolean;
}

export default Task;
export type { TaskData };
