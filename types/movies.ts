export enum MovieApiUrl {
  IMG = "https://image.tmdb.org/t/p/w500",
  MOVIE_LIST_KO = "https://api.themoviedb.org/3/movie/top_rated?language=ko-KO",
  MOVIE_LIST_EN = "https://api.themoviedb.org/3/movie/top_rated?language=en-US",
  MOVIE_DETAIL = "https://api.themoviedb.org/3/movie/",
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
