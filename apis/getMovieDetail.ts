import { GetMovieDetailResult, MovieApiUrl, MovieDetail, parsedMovieDetail } from "@/types/movies";
import axios from "axios";

const movieDetailParser = (data: MovieDetail) => {
  const movieDetail: parsedMovieDetail = {
    id: data.id,
    adult: data.adult,
    backdrop_path: data.backdrop_path,
    genres: data.genres.map((el) => el.name),
    overview: data.overview === "" ? "아쉽게도 요약 정보가 없네용...ㅠoㅠ" : data.overview,
    title: data.title,
    original_title: data.original_title,
    vote_average: data.vote_average,
    release_date: data.release_date,
  };
  return movieDetail;
};

const getMovieDetail = async (id: number) => {
  const url = `${id}?language=ko-KO&api_key=${process.env.NEXT_PUBLIC_MUSIC_API_KEY}`;
  const data = await getMovieDetailInstance<any, MovieDetail>(url);
  const parsedMovieDetail: GetMovieDetailResult = {
    movieDetail: null,
    isSuccess: false,
  };
  if (data) {
    parsedMovieDetail.movieDetail = movieDetailParser(data);
    parsedMovieDetail.isSuccess = true;
  }
  return parsedMovieDetail;
};

const getMovieDetailInstance = axios.create({
  baseURL: MovieApiUrl.MOVIE_DETAIL,
  timeout: 2500,
});

getMovieDetailInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log(error);
    return null;
  }
);

getMovieDetailInstance.interceptors.response.use(
  (response) => {
    const res = response.data;
    return res;
  },
  (error) => {
    console.log(error);
    return null;
  }
);

export default getMovieDetail;
