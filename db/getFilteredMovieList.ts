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
  FITERED_MOVIE_ACTION,
  FilteredMovieList,
  MOVIE_LIST_FILTER,
  ParsedFilteredMovieList,
} from "@/types/movies";
import { convertTimestampToHourMinute } from "@/utils/convertTimestamp";
import { useCommentedDispatchContext } from "@/context/FilteredMovieContext";

export const filterOptions = [
  { value: MOVIE_LIST_FILTER.COMMENT_NUM_DESC, label: "댓글 많은 순" },
  { value: MOVIE_LIST_FILTER.AVERAGE_RATING_DESC, label: "평점 높은 순" },
  { value: MOVIE_LIST_FILTER.RECENT_COMMENT, label: "최신 댓글 순" },
];

const FilteredMovieListParser = (data: FilteredMovieList) => {
  const parsedData: ParsedFilteredMovieList = {
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
  const dispatch = useCommentedDispatchContext();
  // const [hasMoreList, setHasMoreList] = useState(false);
  const movieCollection = collection(db, "movie_detail");

  const getMovieListSortedByFilter = async (
    cursor: QueryDocumentSnapshot<DocumentData> | null,
    updateSetCursor: (nextCursor: QueryDocumentSnapshot<DocumentData>) => void,
    filterValue: MOVIE_LIST_FILTER
  ) => {
    const sortedResult: ParsedFilteredMovieList[] = [];
    let movieQuery;

    !cursor
      ? (movieQuery = query(
          movieCollection,
          orderBy(`${filterValue}`, "desc"),
          limit(10)
        ))
      : (movieQuery = query(
          movieCollection,
          orderBy(`${filterValue}`, "desc"),
          startAfter(cursor),
          limit(10)
        ));

    const movieListDocs = await getDocs(movieQuery);
    const nextCursor = movieListDocs.docs[movieListDocs.docs.length - 1];
    if (nextCursor) {
      updateSetCursor(nextCursor);
      dispatch({
        type: FITERED_MOVIE_ACTION.SET_MORE_LIST,
        payload: {
          hasMoreList: true,
        },
      });
    } else {
      dispatch({
        type: FITERED_MOVIE_ACTION.SET_MORE_LIST,
        payload: {
          hasMoreList: false,
        },
      });
    }

    movieListDocs.docs.forEach((doc: any) => {
      const parsedData = FilteredMovieListParser({ ...doc.data(), id: doc.id });
      sortedResult.push({ ...parsedData });
    });

    return sortedResult.filter((el) => el.count_comment !== undefined);
  };

  return { getMovieListSortedByFilter };
}
