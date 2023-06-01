import firebase from "firebase/compat/app";

import Task, { TaskData } from "./task";
import Subgoal, { SubgoalData } from "./subgoal";
import Goal from "./goal";
import Schedule, { ScheduleData } from "./schedule";

export interface User {
  uid: string;
  name: string | null;
  photoURL: string | null;
}

export const timestampToDate = (
  timestamp: firebase.firestore.Timestamp | undefined
) => {
  return timestamp === undefined ? undefined : timestamp.toDate();
};

export const docRefsToSubgoals = async (
  goal: Goal,
  docRefs: firebase.firestore.DocumentReference[]
): Promise<Subgoal[]> => {
  const fetchPromises = docRefs.map(async (docRef) => {
    const snapshot = await docRef.get();
    return {
      subgoalId: docRef.id,
      subgoalData: snapshot.data() as SubgoalData,
    };
  });
  const snapshotsWithId = await Promise.all(fetchPromises);
  const subgoals = snapshotsWithId.map(({ subgoalId, subgoalData }) => {
    return Subgoal.createFromSubgoalData(subgoalId, goal, subgoalData);
  });
  return Promise.all(subgoals);
};

export const docRefsToTasks = async (
  parent: Goal | Subgoal,
  docRefs: firebase.firestore.DocumentReference[]
): Promise<Task[]> => {
  const fetchPromises = docRefs.map(async (docRef) => {
    const snapshot = await docRef.get();
    return {
      taskId: docRef.id,
      taskData: snapshot.data() as TaskData,
    };
  });
  const snapshotWithId = await Promise.all(fetchPromises);
  const tasks = snapshotWithId.map(({ taskId, taskData }) => {
    return Task.createFromTaskData(taskId, parent, taskData);
  });
  return Promise.all(tasks);
};

export const docRefsToSchedule = async (
  goal: Goal,
  subgoal: Subgoal | undefined,
  task: Task,
  docRefs: firebase.firestore.DocumentReference[]
): Promise<Schedule[]> => {
  const fetchPromises = docRefs.map(async (docRef) => {
    const snapshot = await docRef.get();
    return {
      scheduleId: docRef.id,
      scheduleData: snapshot.data() as ScheduleData,
    };
  });
  const snapshotsWithId = await Promise.all(fetchPromises);
  return snapshotsWithId.map(({ scheduleId, scheduleData }) => {
    return Schedule.createFromScheduleData(
      scheduleId,
      goal,
      subgoal,
      task,
      scheduleData
    );
  });
};
