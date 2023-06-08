import axios from "axios";
import { GetMovieListResult, MovieApiUrl, movieList } from "@/types/movies";

const getMovieList = async (index: number) => {
  const url = `&page=${index}&api_key=${process.env.NEXT_PUBLIC_MUSIC_API_KEY}`;
  const data = await getMovieListInstance<any, movieList>(url);
  const result: GetMovieListResult = {
    movieList: null,
    isSuccess: false,
  };
  if (data) {
    result.movieList = data;
    result.isSuccess = true;
  }
  return result;
};

const getMovieListInstance = axios.create({
  baseURL: MovieApiUrl.MOVIE_LIST_KO,
  timeout: 2500,
});

getMovieListInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log(error);
    return null;
  }
);

getMovieListInstance.interceptors.response.use(
  (response) => {
    const res = response.data.results;
    return res;
  },
  (error) => {
    console.log(error);
    return null;
  }
);

export default getMovieList;
