import { v4 as uuid } from "uuid";
import firebase from "firebase/compat/app";
import _ from "lodash";
import moment, { Moment, Duration } from "moment";

import Subgoal from "./subgoal";
import Task from "./task";
import { docRefsToSubgoals, docRefsToTasks } from "./utils";
import Schedule from "./schedule";

class Goal {
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
      moment(goalData.deadline),
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

  toGoalReviewVO = (): GoalReviewVO => {
    const subgoalTasks = this.subgoals.map((subgoal) => subgoal.tasks).flat();
    const tasks = subgoalTasks.concat(this.tasks);
    const schedulesWithTime = tasks
      .map((task) => task.schedules)
      .flat()
      .filter((schedule) => schedule.startTime && schedule.endTime);

    const result: GoalReviewVO = {
      id: this.id,
      name: this.name,
      actualEffort: moment.duration(0),
      period: moment.duration(0),
      endDate: undefined,
    };
    if (schedulesWithTime.length > 0) {
      result.actualEffort = schedulesWithTime.reduce(
        (acc: Duration, schedule: Schedule) => {
          return acc.add(schedule.getDuration());
        },
        moment.duration(0)
      );
      const startDate = moment.min(
        schedulesWithTime.map((schedule) => schedule.startTime!)
      );
      result.endDate = moment.max(
        schedulesWithTime.map((schedule) => schedule.endTime!)
      );
      result.period = moment.duration(result.endDate.diff(startDate));
    }
    return result;
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

interface GoalReviewVO {
  id: string;
  name: string;
  actualEffort: Duration;
  period: Duration;
  endDate: Moment | undefined;
}

export default Goal;
export type { GoalData };
