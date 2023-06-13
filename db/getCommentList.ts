import { db } from "@/firebase/config";
import { Comment } from "@/types/comment";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function getCommentList(movieId: number) {
  const [commentList, setCommentList] = useState<Comment[]>(() => []);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCommentQuery = query(
      collection(db, "movie_detail", `${movieId}`, "comments"),
      orderBy("createdTime", "asc")
    );
    const unsubscribe = onSnapshot(
      getCommentQuery,
      (snapshot) => {
        const result: Comment[] = [];

        snapshot.docs.forEach((doc: any) => {
          result.push({ id: doc.id, ...doc.data() });
        });
        console.log(result);
        setCommentList(() => result);
        setError(null);
      },
      (error: any) => {
        setError(error.message);
      }
    );

    return unsubscribe;
  }, [collection]);

  return { commentList, error };
}
