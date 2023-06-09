import { v4 as uuid } from "uuid";
import firebase from "firebase/compat/app";
import moment, { Moment } from "moment";
import { DocumentData, DocumentReference } from "@firebase/firestore-types";

import Task from "./task";
import Goal from "./goal";
import { docRefsToTasks } from "./utils";
import { ReviewStats, Reviewable } from "./reviewStats";

class Subgoal implements Reviewable {
  static readonly type: string = "subgoal";
  id: string;
  goal: Goal;
  name: string;
  tasks: { [key: string]: Task };
  deadline: Moment;
  isClosed: boolean;

  constructor(
    name: string,
    goal: Goal,
    deadline: Moment,
    tasks: { [key: string]: Task } = {},
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
    subgoalData: SubgoalData,
    retrieveChildren: boolean = true
  ): Promise<Subgoal> {
    const newSubgoal = new Subgoal(
      subgoalData.name,
      goal,
      moment(subgoalData.deadline.toMillis()),
      {},
      subgoalData.isClosed,
      id
    );
    if (retrieveChildren) {
      const tasks = await docRefsToTasks(newSubgoal, subgoalData.tasks);
      newSubgoal.tasks = Object.fromEntries(
        tasks.map((task) => [task.id, task])
      );
    }
    return newSubgoal;
  }

  getReviewStats = (): ReviewStats => {
    const taskRevStats = Object.values(this.tasks).map((task) =>
      task.getReviewStats()
    );
    return ReviewStats.aggregateReviewStats(this, taskRevStats);
  };

  getSubgoalData = (
    goalRef: DocumentReference<DocumentData>,
    taskRefs: DocumentReference<DocumentData>[]
  ): SubgoalData => {
    return {
      type: Subgoal.type,
      goal: goalRef,
      name: this.name,
      tasks: taskRefs,
      deadline: firebase.firestore.Timestamp.fromDate(this.deadline.toDate()),
      isClosed: this.isClosed,
    };
  };

  static createFromFormResult = (
    formResult: { [key: string]: string | boolean },
    goal: Goal
  ): Subgoal => {
    return new Subgoal(
      formResult["name"] as string,
      goal,
      moment(formResult["deadline"] as string),
      {},
      false
    );
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

interface SubgoalForm {
  name: "text" | "checkbox";
  deadline: "text" | "checkbox";
}

export const subgoalForm: SubgoalForm = {
  name: "text",
  deadline: "text",
};

export default Subgoal;
export type { SubgoalData, SubgoalForm };
