import getMovieCollection from "@/db/getMovieCollectionList";
import { useEffect } from "react";

export default function useGetMovieCollectionList() {
  const { getMovieCollectionList, movieList } = getMovieCollection();

  useEffect(() => {
    getMovieCollectionList();
  }, []);

  return movieList;
}
