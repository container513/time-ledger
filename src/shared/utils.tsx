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

export const dateToString = (date: Date) => {
  const format = {
    minimumIntegerDigits: 2,
    useGrouping: false,
  };
  var year = date.getFullYear();
  var month = (date.getMonth() + 1).toLocaleString("en-US", format);
  var day = date.getDate().toLocaleString("en-US", format);
  return `${year}.${month}.${day}`;
};
