import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

export enum MOVIE_API_URL {
  IMG = "https://image.tmdb.org/t/p/w500",
  MOVIE_LIST_KO = "https://api.themoviedb.org/3/movie/top_rated?language=ko-KO",
  MOVIE_LIST_EN = "https://api.themoviedb.org/3/movie/top_rated?language=en-US",
  MOVIE_DETAIL = "https://api.themoviedb.org/3/movie/",
}

export enum MOVIE_LIST_FILTER {
  COMMENT_NUM_DESC = "count_comment",
  AVERAGE_RATING_DESC = "vote_average",
  RECENT_COMMENT = "update_comment",
}

export enum FITERED_MOVIE_ACTION {
  ENTER_DETAIL, // 디테일 들어갔을 때 세부사항 저장
  INITIAL_FILTER, // 필터 초기화
  SET_SEEN_FALSE, // DETAIL FALSE로
  SET_FILTER, // 필터 셋팅
  UPDATE_CURSOR, // 커서 업데이트
  SET_MORE_LIST,
}

export type MovieIndex = {
  params: {
    page: number;
  };
};

export type MovieDetailId = {
  params: {
    id: number;
  };
};

export type PopularMovie = {
  adult: boolean;
  id: number;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
};

export type MovieList = PopularMovie[];

export type GetMovieListResult = {
  movieList: MovieList | null;
  isSuccess: boolean;
};

export type Genre = {
  id: number;
  name: string;
};

export type MovieDetail = {
  id: number;
  adult: boolean;
  backdrop_path: string;
  poster_path: string;
  genres: Genre[];
  overview: string;
  title: string;
  original_title: string;
  vote_average: number;
  release_date: string;
};

export type ParsedMovieDetail = {
  id: number;
  adult: boolean;
  backdrop_path: string;
  poster_path: string;
  genres: string[];
  overview: string;
  title: string;
  original_title: string;
  vote_average: number;
  release_date: string;
};

export type MovieDetailInComponent = {
  movieDetail: ParsedMovieDetail;
};

export type GetMovieDetailResult = {
  movieDetail: ParsedMovieDetail | null;
  isSuccess: boolean;
};

export interface MoviePoster {
  genres: Genre[];
  id: string;
  poster_path: string;
  title: string;
  vote_average: number;
  update_comment?: any;
  count_comment?: number;
}

export interface ParsedFilteredMovieList {
  count_comment?: number;
  genres: Genre[];
  id: number;
  poster_path: string;
  title: string;
  update_comment?: string;
  vote_average: number;
}

export type FilterOption = {
  value: MOVIE_LIST_FILTER;
  label: string;
};

export interface MovieCommentedState {
  filterOption: FilterOption;
  dbCursor: QueryDocumentSnapshot<DocumentData> | null;
  beforeMovieList: ParsedFilteredMovieList[];
  scrollY: number;
  hasMoreList: boolean;
  hasSeenDetail: boolean;
}
