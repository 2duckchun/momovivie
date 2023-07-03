import { Timestamp } from "firebase/firestore";

export default function convertTimestamp(timestamp: Timestamp) {
  let date = timestamp?.toDate();
  let month = date?.getMonth() + 1;
  let day = date?.getDate();
  let year = date?.getFullYear();
  return `${month}/${day}/${year}`;
}

export function convertTimestampToHourMinute(timestamp: Timestamp) {
  if (!timestamp) {
    return "댓글이 없어요 ㅠoㅠ";
  }

  let date = timestamp?.toDate();
  let minute = date?.getMinutes();
  let hour = date?.getHours();
  let month = date?.getMonth() + 1;
  let day = date?.getDate();
  let year = date?.getFullYear();

  return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분`;
}
