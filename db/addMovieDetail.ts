import { ParsedMovieDetail } from "@/types/movies";
import { db } from "@/firebase/config";
import { doc, setDoc } from "firebase/firestore";

export default function addMovieDetail(movieDetail: ParsedMovieDetail) {
  const movieDetailRef = doc(db, "movie_detail", `${movieDetail.id}`);
  const data = {
    id: movieDetail?.id,
    title: movieDetail?.title,
    poster_path: movieDetail?.poster_path,
    genres: movieDetail?.genres,
    vote_average: movieDetail?.vote_average,
  };

  setDoc(movieDetailRef, data, { merge: true });
}
