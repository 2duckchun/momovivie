import { Timestamp } from "firebase/firestore";

export default function convertTimestamp(timestamp: Timestamp) {
  let date = timestamp.toDate();
  let mm = date.getMonth() + 1;
  let dd = date.getDate();
  let yy = date.getFullYear();

  return mm + "/" + dd + "/" + yy;
}
