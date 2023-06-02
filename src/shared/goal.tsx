import { v4 as uuid } from "uuid";
import firebase from "firebase/compat/app";
import _ from "lodash";
import moment, { Moment } from "moment";

import Subgoal from "./subgoal";
import Task from "./task";
import { docRefsToSubgoals, docRefsToTasks } from "./utils";
import { ReviewStats, Reviewable } from "./reviewStats";

class Goal implements Reviewable {
  static readonly type: string = "goal";
  id: string;
  name: string;
  subgoals: Subgoal[];
  tasks: Task[];
  deadline: Moment;
  isClosed: boolean;

  constructor(
    name: string,
    deadline: Moment,
    subgoals: Subgoal[] = [],
    tasks: Task[] = [],
    isClosed: boolean = false,
    id?: string
  ) {
    this.id = id !== undefined ? id : uuid();
    this.name = name;
    this.subgoals = subgoals;
    this.tasks = tasks;
    this.deadline = deadline;
    this.isClosed = isClosed;
  }

  static async createFromGoalData(
    id: string,
    goalData: GoalData
  ): Promise<Goal> {
    const newGoal = new Goal(
      goalData.name,
      moment(goalData.deadline.toMillis()),
      [],
      [],
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

  getReviewStats = (): ReviewStats => {
    const subgoalRevStats = this.subgoals.map((subgoal) =>
      subgoal.getReviewStats()
    );
    const taskRevStats = this.tasks.map((task) => task.getReviewStats());
    const childRevStats = subgoalRevStats.concat(taskRevStats);
    return ReviewStats.aggregateReviewStats(this, childRevStats);
  };
}

interface GoalData {
  type: string;
  name: string;
  subgoals: firebase.firestore.DocumentReference[];
  tasks: firebase.firestore.DocumentReference[];
  deadline: firebase.firestore.Timestamp;
  isClosed: boolean;
}

export default Goal;
export type { GoalData };
