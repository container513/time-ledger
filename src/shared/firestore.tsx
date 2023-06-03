import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { Moment } from "moment";

import Goal, { GoalData } from "./goal";
import Schedule from "./schedule";

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

const fetchScheduleOfDate = async (uid: string, date: Moment) => {
  const collectionRef = db.collection(uid);
  const startOfDate = date.clone().startOf("d"); // requires clone() since startOf() is not in-place
  const endOfDate = date.clone().endOf("d");
  const querySnapshot = await collectionRef
    .where("type", "==", Schedule.type)
    .where("date", ">=", startOfDate.toDate())
    .where("date", "<=", endOfDate.toDate())
    .get();

  querySnapshot.forEach((doc) => {
    // TODO: create schedule objects based on doc.id and doc.data()
  });
};

export {
  firebaseApp,
  fetchGoal,
  fetchOngoingGoals,
  fetchGoalReviewStats,
  fetchScheduleOfDate,
};
