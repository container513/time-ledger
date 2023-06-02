import { v4 as uuid } from "uuid";
import firebase from "firebase/compat/app";
import moment, { Moment, Duration } from "moment";

import Task from "./task";
import Goal from "./goal";
import { docRefsToTasks } from "./utils";
import { ReviewStats, Reviewable } from "./reviewStats";

class Subgoal implements Reviewable {
  static readonly type: string = "subgoal";
  id: string;
  goal: Goal;
  name: string;
  tasks: Task[];
  deadline: Moment;
  isClosed: boolean;

  constructor(
    name: string,
    goal: Goal,
    deadline: Moment,
    tasks: Task[] = [],
    isClosed: boolean = false,
    id?: string
  ) {
    this.id = id !== undefined ? id : uuid();
    this.goal = goal;
    this.name = name;
    this.tasks = tasks;
    this.deadline = deadline;
    this.isClosed = isClosed;
  }

  static async createFromSubgoalData(
    id: string,
    goal: Goal,
    subgoalData: SubgoalData
  ): Promise<Subgoal> {
    const newSubgoal = new Subgoal(
      subgoalData.name,
      goal,
      moment(subgoalData.deadline),
      [],
      subgoalData.isClosed,
      id
    );
    newSubgoal.tasks = await docRefsToTasks(newSubgoal, subgoalData.tasks);
    return newSubgoal;
  }

  getReviewStats = (): ReviewStats => {
    const revStats = new ReviewStats(this);
    if (this.tasks.length > 0) {
      revStats.actualEffort = this.tasks.reduce((acc: Duration, task: Task) => {
        return acc.add(task.getReviewStats().actualEffort);
      }, moment.duration(0));
      revStats.startDate = moment.min(
        this.tasks.map((task) => task.getReviewStats().startDate!)
      );
      revStats.endDate = moment.max(
        this.tasks.map((task) => task.getReviewStats().endDate!)
      );
    }
    return revStats;
  };
}

interface SubgoalData {
  type: string;
  goal: firebase.firestore.DocumentReference;
  name: string;
  tasks: firebase.firestore.DocumentReference[];
  deadline: firebase.firestore.Timestamp;
  isClosed: boolean;
}

export default Subgoal;
export type { SubgoalData };
