import { createContext, useContext, useReducer } from "react";
import { MOVIE_LIST_FILTER, MovieCommentedState } from "@/types/movies";

const initialState: MovieCommentedState = {
  filter: MOVIE_LIST_FILTER.COMMENT_NUM_DESC,
  dbCursor: null,
  movieList: [],
  scrollY: 0,
  isSeenMovieDetail: false,
};

const commentedContextState = createContext<MovieCommentedState | null>(null);
const commentedContextDispatch = createContext<any>(null);

const filteredMovieContextReducer = (
  prevState: MovieCommentedState,
  action: any
): MovieCommentedState => {
  switch (action.type) {
    case "ENTER_MOVIE_DETAIL":
      console.log("띠용", prevState);
      return {
        filter: action.payload.filter,
        dbCursor: action.payload.dbCursor,
        movieList: action.payload.movieList,
        scrollY: action.payload.scrollY,
        isSeenMovieDetail: true,
      };
    default:
      return { ...prevState };
  }
};

export const MovieCommentedContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [commentedState, commentedDispatch] = useReducer(
    filteredMovieContextReducer,
    initialState
  );

  return (
    <commentedContextState.Provider value={commentedState}>
      <commentedContextDispatch.Provider value={commentedDispatch}>
        {children}
      </commentedContextDispatch.Provider>
    </commentedContextState.Provider>
  );
};

export const useCommentedContextState = () => {
  const state = useContext(commentedContextState);
  if (!state) throw new Error("commented State를 찾을 수 없습니다.");
  return state;
};

export const FilteredMovieDispatchContext = () => {
  const state = useContext(commentedContextDispatch);
  if (!state)
    throw new Error("commented Dispatch를 컨텍스트를 찾을 수 없습니다.");
  return state;
};
