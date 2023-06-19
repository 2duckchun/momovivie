import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

export enum MOVIE_API_URL {
  IMG = "https://image.tmdb.org/t/p/w500",
  MOVIE_LIST_KO = "https://api.themoviedb.org/3/movie/top_rated?language=ko-KO",
  MOVIE_LIST_EN = "https://api.themoviedb.org/3/movie/top_rated?language=en-US",
  MOVIE_DETAIL = "https://api.themoviedb.org/3/movie/",
}

export enum MOVIE_LIST_FILTER {
  NO_CHOICE = "NO_CHOICE",
  COMMENT_NUM_DESC = "count_comment",
  AVERAGE_RATING_DESC = "vote_average",
  RECENT_COMMENT = "update_comment",
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

export type movieList = PopularMovie[];

export type GetMovieListResult = {
  movieList: movieList | null;
  isSuccess: boolean;
};

export type genre = {
  id: number;
  name: string;
};

export type MovieDetail = {
  id: number;
  adult: boolean;
  backdrop_path: string;
  poster_path: string;
  genres: genre[];
  overview: string;
  title: string;
  original_title: string;
  vote_average: number;
  release_date: string;
};

export type parsedMovieDetail = {
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
  movieDetail: parsedMovieDetail;
};

export type GetMovieDetailResult = {
  movieDetail: parsedMovieDetail | null;
  isSuccess: boolean;
};

export interface FilteredMovieList {
  count_comment: number;
  genres: genre[];
  id: string;
  poster_path: string;
  title: string;
  update_comment: any;
  vote_average: number;
}

export interface parsedFilteredMovieList {
  count_comment: number;
  genres: genre[];
  id: number;
  poster_path: string;
  title: string;
  update_comment: string;
  vote_average: number;
}

export interface MovieCommentedState {
  filter: MOVIE_LIST_FILTER;
  dbCursor: QueryDocumentSnapshot<DocumentData> | null;
  movieList: parsedFilteredMovieList[];
  scrollY: number;
  isSeenMovieDetail: boolean;
}
