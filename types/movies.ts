export enum MovieApiUrl {
  IMG = "https://image.tmdb.org/t/p/w500/",
  MOVIE_LIST_KO = "https://api.themoviedb.org/3/movie/top_rated?language=ko-KO",
  MOVIE_LIST_EN = "https://api.themoviedb.org/3/movie/top_rated?language=en-US",
}

export type MovieIndex = {
  params: {
    page: number;
  };
};

export type PopularMovie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<Number>;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type PopularMovieList = {
  results?: Array<PopularMovie>;
};
