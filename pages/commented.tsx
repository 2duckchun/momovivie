import Seo from "@/components/Seo";
import CustomSelect from "@/components/commented/CustomSelect";
import { filterOptions } from "@/db/getFilteredMovieList";
import {
  useCommentedContextState,
  useCommentedDispatchContext,
} from "@/context/FilteredMovieContext";
import { FITERED_MOVIE_ACTION, ParsedFilteredMovieList } from "@/types/movies";
import { useEffect, useState } from "react";
import getFilteredMovieList from "@/db/getFilteredMovieList";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import FilteredMovieList from "@/components/commented/FilteredMovieList";

export default function Commented() {
  const commentedContextState = useCommentedContextState();
  const commentedContextDispatch = useCommentedDispatchContext();
  const [movieList, setMovieList] = useState<ParsedFilteredMovieList[]>([]);
  const { getMovieListSortedByFilter } = getFilteredMovieList();

  const setFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    commentedContextDispatch({
      type: FITERED_MOVIE_ACTION.SET_FILTER,
      payload: {
        currentFilter: event,
      },
    });
  };

  const getMoreMovie = async () => {
    const moreFiveMovie = await getMovieListSortedByFilter(
      commentedContextState.dbCursor,
      updateDBCursor,
      commentedContextState.filterOption.value
    );
    setMovieList((prev) => [...prev, ...moreFiveMovie]);
  };

  const updateDBCursor = (nextCursor: QueryDocumentSnapshot<DocumentData>) => {
    commentedContextDispatch({
      type: FITERED_MOVIE_ACTION.UPDATE_CURSOR,
      payload: {
        currentDBCursor: nextCursor,
      },
    });
  };

  const fetchCommentedMovieList = async (
    cursor: any,
    updateFn: any,
    filter: any
  ) => {
    const sortedResult = await getMovieListSortedByFilter(
      cursor,
      updateFn,
      filter
    );
    setMovieList(() => [
      ...commentedContextState.beforeMovieList,
      ...sortedResult,
    ]);
  };

  useEffect(() => {
    if (!commentedContextState.hasSeenDetail) {
      commentedContextDispatch({
        type: FITERED_MOVIE_ACTION.INITIAL_FILTER,
      });
      fetchCommentedMovieList(
        commentedContextState.dbCursor,
        updateDBCursor,
        commentedContextState.filterOption.value
      );
    } else {
      setMovieList(() => [...commentedContextState.beforeMovieList]);
      setTimeout(() => {
        window.scrollTo(0, commentedContextState.scrollY);
      }, 2);
      commentedContextDispatch({
        type: FITERED_MOVIE_ACTION.SET_SEEN_FALSE,
      });
    }
  }, [commentedContextState.filterOption]);

  return (
    <div className="container">
      <Seo title="Commented | Momovivie"></Seo>
      <h3 className="commented-title">댓글 달린 영화 필터링!</h3>
      <CustomSelect
        option={commentedContextState.filterOption}
        setOption={setFilter}
        initOption={filterOptions}
      />
      <FilteredMovieList movieList={movieList} />
      <button className="btn-two block" onClick={() => getMoreMovie()}>
        {commentedContextState.hasMoreList ? "더 보기" : "No more list"}
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
