import Seo from "@/components/Seo";
import SelectFilter from "@/components/commented/SelectFilter";
import getCommentedMovieList from "@/db/getCommentedMovieList";
import getFilteredMovieList from "@/db/getFilteredMovieList";
import { MOVIE_LIST_FILTER } from "@/types/movies";
import { useEffect, useState } from "react";

const selectOption = [
  { value: MOVIE_LIST_FILTER.NO_CHOICE, label: "필터를 선택해주세요." },
  { value: MOVIE_LIST_FILTER.COMMENT_NUM_DESC, label: "댓글 많은 순" },
  { value: MOVIE_LIST_FILTER.AVERAGE_RATING_DESC, label: "평점 높은 순" },
  { value: MOVIE_LIST_FILTER.RECENT_COMMENT, label: "최신 댓글 순" },
];

export default function Commented() {
  const [filter, setFilter] = useState({ ...selectOption[0] });
  const [cursor, setCursor] = useState(null);
  const [movieList, setMovieList] = useState<any>([]);
  const { getMovieListSortedByCommentNum } = getCommentedMovieList();

  const getMoreMovie = async () => {
    const arr = await getMovieListSortedByCommentNum(cursor, setCursor);
    setMovieList((prev) => [...prev, ...arr]);
  };

  useEffect(() => {
    setCursor(() => null);
    const fetchCommentedMovieList = async () => {
      const sortedResult = await getMovieListSortedByCommentNum(
        null,
        setCursor
      );
      setMovieList([...sortedResult]);
    };

    fetchCommentedMovieList();
  }, [filter]);

  return (
    <div className="container">
      <Seo title="Commented | Momovivie"></Seo>
      <div>필터영역</div>
      <SelectFilter
        filter={filter}
        setFilter={setFilter}
        selectOption={selectOption}
      />
      <ul>
        {movieList.map((el: any) => (
          <div>{el.title}</div>
        ))}
      </ul>
      <div onClick={() => getMoreMovie()}>더보기버튼영역</div>
    </div>
  );
}
