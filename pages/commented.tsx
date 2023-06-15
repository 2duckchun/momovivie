import Seo from "@/components/Seo";
import FilteredMovieList from "@/components/commented/FilteredMovieList";
import SelectFilter from "@/components/commented/SelectFilter";
import getFilteredMovieList from "@/db/getFilteredMovieList";
import { MOVIE_LIST_FILTER, parsedFilteredMovieList } from "@/types/movies";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

const selectOption = [
  { value: MOVIE_LIST_FILTER.COMMENT_NUM_DESC, label: "댓글 많은 순" },
  { value: MOVIE_LIST_FILTER.AVERAGE_RATING_DESC, label: "평점 높은 순" },
  { value: MOVIE_LIST_FILTER.RECENT_COMMENT, label: "최신 댓글 순" },
];

export default function Commented() {
  const [filter, setFilter] = useState({ ...selectOption[0] });
  const [cursor, setCursor] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [movieList, setMovieList] = useState<parsedFilteredMovieList[]>([]);
  const { getMovieListSortedByFilter, hasMoreList } = getFilteredMovieList();

  const getMoreMovie = async () => {
    const arr = await getMovieListSortedByFilter(
      cursor,
      setCursor,
      filter.value
    );
    setMovieList((prev) => [...prev, ...arr]);
  };

  useEffect(() => {
    setCursor(() => null);
    const fetchCommentedMovieList = async () => {
      const sortedResult = await getMovieListSortedByFilter(
        null,
        setCursor,
        filter.value
      );
      setMovieList([...sortedResult]);
    };

    fetchCommentedMovieList();
  }, [filter]);

  return (
    <div className="container">
      <Seo title="Commented | Momovivie"></Seo>
      <h3 className="commented-title">댓글 달린 영화 필터링!</h3>
      <SelectFilter
        filter={filter}
        setFilter={setFilter}
        selectOption={selectOption}
      />
      <FilteredMovieList movieList={movieList} />
      <button className="btn-two block" onClick={() => getMoreMovie()}>
        {hasMoreList ? "더 보기" : "No more list"}
      </button>
      <style jsx>{`
        .container {
          font-family: "GmarketSansMedium";
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .commented-title {
          margin: 30px auto 5px;
          display: flex;
          justify-content: center;
          align-items: center;
          line-height: 1rem;
        }
        button {
          all: unset;
          display: block;
          width: 60%;
          margin-left: auto;
          margin-right: auto;
          text-align: center;
          background-color: #f0f0f0;
        }
        .btn-two {
          color: black;
          padding: 10px 10px;
          display: inline-block;
          border: 1px solid rgba(0, 0, 0, 0.21);
          border-bottom-color: rgba(0, 0, 0, 0.34);
          text-shadow: 0 1px 0 rgba(0, 0, 0, 0.15);
          box-shadow: 0 1px 0 rgba(255, 255, 255, 0.34) inset,
            0 2px 0 -1px rgba(0, 0, 0, 0.13), 0 3px 0 -1px rgba(0, 0, 0, 0.08),
            0 3px 13px -1px rgba(0, 0, 0, 0.21);
        }
        .btn-two:active {
          top: 1px;
          border-color: rgba(0, 0, 0, 0.34) rgba(0, 0, 0, 0.21)
            rgba(0, 0, 0, 0.21);
          box-shadow: 0 1px 0 rgba(255, 255, 255, 0.89),
            0 1px rgba(0, 0, 0, 0.05) inset;
          position: relative;
        }
      `}</style>
    </div>
  );
}
