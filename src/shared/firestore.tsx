import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import moment, { Moment } from "moment";

import Goal, { GoalData } from "./goal";
import Subgoal, { SubgoalData } from "./subgoal";
import Task, { TaskData } from "./task";
import Schedule, { ScheduleData } from "./schedule";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIRESTORE_KEY,
  authDomain: "time-ledger.firebaseapp.com",
  projectId: "time-ledger",
  storageBucket: "time-ledger.appspot.com",
  messagingSenderId: "785439513253",
  appId: "1:785439513253:web:1ce1c758335568a3d50b4c",
  measurementId: "G-VG8XPZ9XLM",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(firebaseApp);

const fetchGoal = async (goalId: string, uid: string) => {
  const doc = await db.collection(uid).doc(goalId).get();
  if (doc.data() === undefined) return null;
  return Goal.createFromGoalData(doc.id, doc.data() as GoalData);
};

const fetchOngoingGoals = async (uid: string) => {
  const collectionRef = db.collection(uid);
  const querySnapshot = await collectionRef
    .where("type", "==", Goal.type)
    .where("isClosed", "==", false)
    .get();
  const goalPromises: Promise<Goal>[] = [];
  querySnapshot.forEach((doc) => {
    goalPromises.push(Goal.createFromGoalData(doc.id, doc.data() as GoalData));
  });
  const goals = await Promise.all(goalPromises);
  return Object.fromEntries(goals.map((goal) => [goal.id, goal]));
};

const fetchGoalReviewStats = async (uid: string) => {
  const collectionRef = db.collection(uid);
  const querySnapshot = await collectionRef
    .where("type", "==", Goal.type)
    .get();
  const goalPromises: Promise<Goal>[] = [];
  querySnapshot.forEach((doc) => {
    goalPromises.push(Goal.createFromGoalData(doc.id, doc.data() as GoalData));
  });
  const goals = await Promise.all(goalPromises);
  return goals.map((goal) => goal.getReviewStats());
};

const fetchScheduleOfDate = async (
  uid: string,
  date: Moment,
  ongoingGoals: { [key: string]: Goal }
) => {
  const collectionRef = db.collection(uid);
  const startOfDate = date.clone().startOf("d"); // requires clone() since startOf() is not in-place
  const endOfDate = date.clone().endOf("d");
  const querySnapshot = await collectionRef
    .where("type", "==", Schedule.type)
    .where("date", ">=", startOfDate.toDate())
    .where("date", "<=", endOfDate.toDate())
    .get();

  const schedules: Schedule[] = [];
  querySnapshot.forEach(async (doc) => {
    const schdData = doc.data() as ScheduleData;
    const goalId = schdData.goal.id;
    const sgId = schdData.subgoal?.id;
    const taskId = schdData.task.id;
    let goal: Goal, sg: Subgoal | undefined, task: Task;
    if (goalId in ongoingGoals) {
      // the schedule belongs to an ongoing goal
      // point goal, subgoal, and task to that in the control context
      goal = ongoingGoals[goalId];
      if (sgId !== undefined) {
        sg = goal.subgoals[sgId!];
        task = sg!.tasks[taskId];
      } else {
        sg = undefined;
        task = goal.tasks[taskId];
      }
    } else {
      // the schedule belongs to a closed goal
      // create a dummy goal, subgoal, task
      const goalData = (await schdData.goal.get()).data() as GoalData;
      const sgData = (await schdData.subgoal?.get())?.data() as SubgoalData;
      const taskData = (await schdData.task.get()).data() as TaskData;
      goal = await Goal.createFromGoalData(goalId, goalData, false);
      if (sgId !== undefined) {
        sg = await Subgoal.createFromSubgoalData(sgId, goal, sgData, false);
        task = await Task.createFromTaskData(taskId, sg, taskData, false);
      } else {
        sg = undefined;
        task = await Task.createFromTaskData(taskId, goal, taskData, false);
      }
    }

    let startTime: Moment | undefined = undefined;
    let endTime: Moment | undefined = undefined;
    if (schdData.startTime) startTime = moment(schdData.startTime.toMillis());
    if (schdData.endTime) endTime = moment(schdData.endTime.toMillis());
    const newSchd = new Schedule(
      goal,
      sg,
      task,
      moment(schdData.date.toDate()),
      startTime,
      endTime,
      doc.id
    );
    schedules.push(newSchd);
  });
  return schedules;
};

export {
  firebaseApp,
  fetchGoal,
  fetchOngoingGoals,
  fetchGoalReviewStats,
  fetchScheduleOfDate,
};
