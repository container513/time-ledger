import { v4 as uuid } from "uuid";
import firebase from "firebase/compat/app";
import moment, { Moment } from "moment";

import Task from "./task";
import Goal from "./goal";
import { docRefsToTasks } from "./utils";

class Subgoal {
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
