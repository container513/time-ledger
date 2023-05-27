// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "time-ledger.firebaseapp.com",
  projectId: "time-ledger",
  storageBucket: "time-ledger.appspot.com",
  messagingSenderId: "785439513253",
  appId: "1:785439513253:web:1ce1c758335568a3d50b4c",
  measurementId: "G-VG8XPZ9XLM"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);

export default db;