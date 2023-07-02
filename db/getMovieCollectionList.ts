import { db } from "@/firebase/config";
import { MoviePoster } from "@/types/movies";
import { DocumentData, collection, getDocs, query } from "firebase/firestore";
import { useState } from "react";

const parseDocDataToMoviePoster = (parsedDoc: DocumentData): MoviePoster => {
  return {
    count_comment: parsedDoc.count_comment ?? undefined,
    genres: parsedDoc.genres,
    id: parsedDoc.id,
    poster_path: parsedDoc.poster_path,
    title: parsedDoc.title,
    update_comment: parsedDoc.update_comment ?? undefined,
    vote_average: parsedDoc.vote_average,
  };
};

export default function getMovieCollection() {
  const q = query(collection(db, "movie_detail"));
  const [movieList, setMovieList] = useState<MoviePoster[]>([]);

  const getMovieCollectionList = async () => {
    const parsedMovieList: MoviePoster[] = [];
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const parsedDoc = doc.data();
      parsedMovieList.push(parseDocDataToMoviePoster(parsedDoc));
    });

    setMovieList(() => [...parsedMovieList]);
  };

  return { getMovieCollectionList, movieList };
}
