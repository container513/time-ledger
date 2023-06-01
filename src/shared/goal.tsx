import { v4 as uuid } from "uuid";
import firebase from "firebase/compat/app";
import _ from "lodash";

import Subgoal from "./subgoal";
import Task from "./task";
import { docRefsToSubgoals, docRefsToTasks } from "./utils";

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

  static async createFromGoalData(
    id: string,
    goalData: GoalData
  ): Promise<Goal> {
    const newGoal = new Goal(
      goalData.name,
      goalData.deadline.toDate(),
      [],
      [],
      goalData.accumMsec,
      goalData.isClosed,
      id
    );
    const subgoals = _.sortBy(
      await docRefsToSubgoals(newGoal, goalData.subgoals),
      ["deadline"]
    );
    const tasks = await docRefsToTasks(newGoal, goalData.tasks);
    newGoal.subgoals = subgoals;
    newGoal.tasks = tasks;
    return newGoal;
  }
}

interface GoalData {
  type: string;
  name: string;
  subgoals: firebase.firestore.DocumentReference[];
  tasks: firebase.firestore.DocumentReference[];
  deadline: firebase.firestore.Timestamp;
  accumMsec: number;
  isClosed: boolean;
}

export default Goal;
export type { GoalData };
