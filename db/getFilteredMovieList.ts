import { db } from "@/firebase/config";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  startAt,
  where,
} from "firebase/firestore";

export default function getFilteredMovieList() {
  const movieCollection = collection(db, "movie_detail");

  const getMovieListByCommentDesc = async (cursor: any, setCursor: any) => {
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

    const result: any = [];
    const movieListByCommentDesc = await getDocs(movieQuery);
    console.log(
      movieListByCommentDesc.docs[movieListByCommentDesc.docs.length - 1]
    );
    setCursor(
      movieListByCommentDesc.docs[movieListByCommentDesc.docs.length - 1]
    );
    movieListByCommentDesc.docs.forEach((doc) => {
      result.push({ ...doc.data() });
    });

    return result;
  };

  return { getMovieListByCommentDesc };
}
