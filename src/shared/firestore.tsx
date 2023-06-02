import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

import Goal, { GoalData } from "./goal";

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
  return Promise.all(goalPromises);
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

export { firebaseApp, fetchOngoingGoals, fetchGoalReviewStats };
