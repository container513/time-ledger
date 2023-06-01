import { v4 as uuid } from "uuid";
import firebase from "firebase/compat/app";

import Task, { TaskData } from "./task";
import Goal from "./goal";

class Subgoal {
  static readonly type: string = "subgoal";
  id: string;
  goal: Goal;
  name: string;
  tasks: Task[];
  deadline: Date;
  accumMsec: number;
  isClosed: boolean;

  constructor(
    name: string,
    goal: Goal,
    deadline: Date,
    tasks: Task[] = [],
    accumMsec: number = 0,
    isClosed: boolean = false,
    id?: string
  ) {
    this.id = id !== undefined ? id : uuid();
    this.goal = goal;
    this.name = name;
    this.tasks = tasks;
    this.deadline = deadline;
    this.accumMsec = accumMsec;
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
      subgoalData.deadline.toDate(),
      [],
      subgoalData.accumMsec,
      subgoalData.isClosed,
      id
    );

    // get tasks
    const fetchPromises = subgoalData.tasks.map(async (taskRef) => {
      const snapshot = await taskRef.get();
      return {
        id: taskRef.id,
        taskData: snapshot.data() as TaskData,
      };
    });
    const snapshotWithId = await Promise.all(fetchPromises);
    const tasks = snapshotWithId.map(async ({ id, taskData }) => {
      return await Task.createFromTaskData(id, newSubgoal, taskData);
    });
    newSubgoal.tasks = await Promise.all(tasks);
    return newSubgoal;
  }
}

interface SubgoalData {
  type: string;
  goal: firebase.firestore.DocumentReference;
  name: string;
  tasks: firebase.firestore.DocumentReference[];
  deadline: firebase.firestore.Timestamp;
  accumMsec: number;
  isClosed: boolean;
}

export default Subgoal;
export type { SubgoalData };
