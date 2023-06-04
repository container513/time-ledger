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

const fetchGoals = async (uid: string, ongoingOnly: boolean) => {
  const collectionRef = db.collection(uid);
  const goalsQuery = collectionRef.where("type", "==", Goal.type);
  let querySnapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>;
  if (ongoingOnly) {
    querySnapshot = await goalsQuery.where("isClosed", "==", false).get();
  } else {
    querySnapshot = await goalsQuery.get();
  }
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

  const promises: Promise<Schedule>[] = [];
  querySnapshot.forEach(async (doc) => {
    const promise = new Promise<Schedule>(async (resolve) => {
      const schdData = doc.data() as ScheduleData;

      // retreive taskData => subgoalData => goalData
      let taskData: TaskData,
        sgData: SubgoalData | undefined,
        goalData: GoalData;
      let taskId: string, sgId: string | undefined, goalId: string;
      const taskDocRef = await schdData.task.get();
      taskData = taskDocRef.data() as TaskData;
      taskId = taskDocRef.id;
      const taskParentDocRef = await taskData.parent.get();
      const taskParentId = taskParentDocRef.id;
      const taskParent = taskParentDocRef.data() as {
        type: string;
        [key: string]: any;
      };
      if (taskParent.type === Subgoal.type) {
        // subgoal exists
        sgData = taskParent as SubgoalData;
        sgId = taskParentId;
        const goalDocRef = await sgData.goal.get();
        goalData = goalDocRef.data() as GoalData;
        goalId = goalDocRef.id;
      } else {
        // subgoal does not exist
        sgData = undefined;
        sgId = undefined;
        goalData = taskParent as GoalData;
        goalId = taskParentId;
      }

      // retrieve goal => subgoal => task
      // create dummy objects
      let goal = await Goal.createFromGoalData(goalId, goalData, false);
      let sg: Subgoal | undefined, task: Task;
      if (sgData) {
        sg = await Subgoal.createFromSubgoalData(sgId!, goal, sgData, false);
        task = await Task.createFromTaskData(taskId, sg, taskData, false);
      } else {
        sg = undefined;
        task = await Task.createFromTaskData(taskId, goal, taskData, false);
      }

      // if the schedule belongs to an ongoing goal, point goal/subgoal/task to that in the control context
      if (goalId in ongoingGoals) {
        goal = ongoingGoals[goalId];
        if (sgId !== undefined) {
          sg = goal.subgoals[sgId];
          task = sg.tasks[taskId];
        } else {
          sg = undefined;
          task = goal.tasks[taskId];
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

      resolve(newSchd);
    });
    promises.push(promise);
  });
  return Promise.all(promises);
};

export {
  firebaseApp,
  fetchGoal,
  fetchGoals,
  fetchGoalReviewStats,
  fetchScheduleOfDate,
};
