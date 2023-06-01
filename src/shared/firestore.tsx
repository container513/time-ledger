import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

import Goal from "./goal";

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
  const ongoingGoalRefs = await collectionRef
    .where("type", "==", Goal.type)
    .get();
  ongoingGoalRefs.forEach((goalRef) => {
    console.log(goalRef.id, " => ", goalRef.data());
  });
  // TODO
};

export { firebaseApp, fetchOngoingGoals };
