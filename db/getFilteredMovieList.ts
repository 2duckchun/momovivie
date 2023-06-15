import { Dispatch, SetStateAction, useState } from "react";
import { db } from "@/firebase/config";
import {
  DocumentData,
  QueryDocumentSnapshot,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import {
  FilteredMovieList,
  MOVIE_LIST_FILTER,
  parsedFilteredMovieList,
} from "@/types/movies";
import { convertTimestampToHourMinute } from "@/utils/convertTimestamp";

const FilteredMovieListParser = (data: FilteredMovieList) => {
  const parsedData: parsedFilteredMovieList = {
    count_comment: data.count_comment,
    genres: data.genres,
    id: parseInt(data.id),
    poster_path: data.poster_path,
    title: data.title,
    update_comment: convertTimestampToHourMinute(data.update_comment),
    vote_average: data.vote_average,
  };
  return parsedData;
};

export default function getCommentedMovieList() {
  const [hasMoreList, setHasMoreList] = useState(false);
  const movieCollection = collection(db, "movie_detail");

  const getMovieListSortedByFilter = async (
    cursor: QueryDocumentSnapshot<DocumentData> | null,
    setCursor: Dispatch<
      SetStateAction<QueryDocumentSnapshot<DocumentData> | null>
    >,
    filterValue: MOVIE_LIST_FILTER
  ) => {
    const sortedResult: parsedFilteredMovieList[] = [];
    let movieQuery;

    if (filterValue === MOVIE_LIST_FILTER.COMMENT_NUM_DESC) {
      !cursor
        ? (movieQuery = query(
            movieCollection,
            where(`${filterValue}`, ">", 0),
            orderBy(`${filterValue}`, "desc"),
            limit(10)
          ))
        : (movieQuery = query(
            movieCollection,
            where(`${filterValue}`, ">", 0),
            orderBy(`${filterValue}`, "desc"),
            startAfter(cursor),
            limit(10)
          ));
    } else {
      !cursor
        ? (movieQuery = query(
            movieCollection,
            where(MOVIE_LIST_FILTER.COMMENT_NUM_DESC, ">", 0),
            orderBy(MOVIE_LIST_FILTER.COMMENT_NUM_DESC, "desc"),
            orderBy(`${filterValue}`, "desc"),
            limit(10)
          ))
        : (movieQuery = query(
            movieCollection,
            where(MOVIE_LIST_FILTER.COMMENT_NUM_DESC, ">", 0),
            orderBy(MOVIE_LIST_FILTER.COMMENT_NUM_DESC, "desc"),
            orderBy(`${filterValue}`, "desc"),
            startAfter(cursor),
            limit(10)
          ));
    }

    const movieListDocs = await getDocs(movieQuery);
    const nextCursor = movieListDocs.docs[movieListDocs.docs.length - 1];

    if (nextCursor) {
      setCursor(() => nextCursor);
      setHasMoreList(true);
    } else {
      setHasMoreList(false);
    }

    movieListDocs.docs.forEach((doc: any) => {
      const parsedData = FilteredMovieListParser({ ...doc.data(), id: doc.id });
      sortedResult.push({ ...parsedData });
    });

    return sortedResult;
  };

  return { getMovieListSortedByFilter, hasMoreList };
}
