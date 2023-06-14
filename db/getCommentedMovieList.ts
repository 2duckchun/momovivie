import { useState } from "react";
import { db } from "@/firebase/config";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";

export default function getCommentedMovieList() {
  const [hasMoreList, setHasMoreList] = useState(false);
  // useReducer의 등장이 필수적일듯
  const movieCollection = collection(db, "movie_detail");

  const getMovieListSortedByCommentNum = async (cursor, setCursor) => {
    let movieQuery;
    if (cursor === null) {
      movieQuery = query(
        movieCollection,
        where("count_comment", ">", 0),
        orderBy("count_comment", "desc"),
        limit(5)
      );
    } else {
      movieQuery = query(
        movieCollection,
        where("count_comment", ">", 0),
        orderBy("count_comment", "desc"),
        startAfter(cursor),
        limit(5)
      );
    }

    const sortedResult = [];
    const movieListDocs = await getDocs(movieQuery);
    const nextCursor = movieListDocs.docs[movieListDocs.docs.length - 1];
    nextCursor ? setCursor(() => nextCursor) : console.log("끝이여~");
    movieListDocs.docs.forEach((doc) => {
      sortedResult.push({ ...doc.data(), id: doc.id });
    });

    return sortedResult;
  };

  return { getMovieListSortedByCommentNum };
}
