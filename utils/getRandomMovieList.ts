import { MoviePoster } from "@/types/movies";

export default function getRandomMovieList(movieList: MoviePoster[]) {
  if (movieList.length === 0) return undefined;

  const randomMovieList = [];

  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * movieList.length);
    randomMovieList.push(movieList[randomIndex]);
    movieList = [
      ...movieList.slice(0, randomIndex),
      ...movieList.slice(randomIndex + 1),
    ];
  }

  return randomMovieList;
}
