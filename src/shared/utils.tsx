import firebase from "firebase/compat/app";

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
