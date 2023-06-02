import { v4 as uuid } from "uuid";
import firebase from "firebase/compat/app";
import _ from "lodash";
import moment, { Moment, Duration } from "moment";

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
    const revStats = new ReviewStats(this);
    if (this.subgoals.length > 0) {
      revStats.actualEffort = this.subgoals.reduce(
        (acc: Duration, subgoal: Subgoal) => {
          return acc.add(subgoal.getReviewStats().actualEffort);
        },
        moment.duration(0)
      );
      revStats.startDate = moment.min(
        this.subgoals.map((subgoal) => subgoal.getReviewStats().startDate!)
      );
      revStats.endDate = moment.max(
        this.subgoals.map((subgoal) => subgoal.getReviewStats().endDate!)
      );
    }
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
