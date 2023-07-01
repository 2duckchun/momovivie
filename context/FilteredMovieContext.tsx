import { Dispatch, createContext, useContext, useReducer } from "react";
import { MovieCommentedState, FITERED_MOVIE_ACTION } from "@/types/movies";
import { filterOptions } from "@/db/getFilteredMovieList";

const initialState: MovieCommentedState = {
  filterOption: filterOptions[0],
  dbCursor: null,
  beforeMovieList: [],
  scrollY: 0,
  hasMoreList: false,
  hasSeenDetail: false,
};

const commentedContextState = createContext<MovieCommentedState | null>(null);
const commentedContextDispatch = createContext<Dispatch<any> | null>(null);

const filteredMovieContextReducer = (
  prevState: MovieCommentedState,
  action: any
): MovieCommentedState => {
  switch (action.type) {
    case FITERED_MOVIE_ACTION.ENTER_DETAIL:
      return {
        ...prevState,
        scrollY: window.scrollY,
        beforeMovieList: action.payload.beforeMovieList,
        hasSeenDetail: true,
      };

    case FITERED_MOVIE_ACTION.INITIAL_FILTER:
      return {
        ...prevState,
        dbCursor: null,
        beforeMovieList: [],
        scrollY: 0,
        hasSeenDetail: false,
      };

    case FITERED_MOVIE_ACTION.SET_SEEN_FALSE:
      return {
        ...prevState,
        hasSeenDetail: false,
        scrollY: 0,
      };

    case FITERED_MOVIE_ACTION.SET_FILTER:
      return {
        hasMoreList: false,
        filterOption: action.payload.currentFilter,
        dbCursor: null,
        beforeMovieList: [],
        scrollY: 0,
        hasSeenDetail: false,
      };

    case FITERED_MOVIE_ACTION.UPDATE_CURSOR:
      return {
        ...prevState,
        dbCursor: action.payload.currentDBCursor,
      };

    case FITERED_MOVIE_ACTION.SET_MORE_LIST:
      console.log(action);
      return {
        ...prevState,
        hasMoreList: action.payload.hasMoreList,
      };

    default:
      return prevState;
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

export const useCommentedDispatchContext = () => {
  const dispatch = useContext(commentedContextDispatch);
  if (!dispatch)
    throw new Error("commented Dispatch를 컨텍스트를 찾을 수 없습니다.");
  return dispatch;
};
