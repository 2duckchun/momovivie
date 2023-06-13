import { db, timestamp } from "@/firebase/config";
import { AddCommentReducer, Comment } from "@/types/comment";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  increment,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useReducer } from "react";

const initState = {
  document: null,
  isPending: false,
  error: null,
  success: false,
};

const storeReducer = (state: AddCommentReducer, action: any) => {
  switch (action.type) {
    case "isPending":
      return { isPending: true, document: null, success: false, error: null };
    case "addDoc":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "error":
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      };
    case "deleteDoc":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    default:
      return state;
  }
};

export default function useMovieDetailComment(movieId: number) {
  const [response, dispatch] = useReducer(storeReducer, initState);
  const commentRef = collection(db, "movie_detail", `${movieId}`, "comments");
  const movieRef = doc(db, "movie_detail", `${movieId}`);

  const addComment = async (doc: Comment) => {
    dispatch({ type: "isPending" });
    try {
      const createdTime = timestamp.fromDate(new Date());
      const docRef = await addDoc(commentRef, { ...doc, createdTime });
      await updateDoc(movieRef, {
        count_comment: increment(1),
        update_comment: createdTime,
      });

      dispatch({ type: "addDoc", payload: docRef });
    } catch (error: any) {
      dispatch({ type: "error", payload: error.message });
    }
  };

  const deleteComment = async (commentId: string) => {
    dispatch({ type: "isPending" });
    try {
      const docRef = await deleteDoc(doc(commentRef, commentId));
      dispatch({ type: "deleteDoc", payload: docRef });
    } catch (error: any) {
      dispatch({ type: "error", payload: error.message });
    }
  };

  return { addComment, deleteComment, response };
}
