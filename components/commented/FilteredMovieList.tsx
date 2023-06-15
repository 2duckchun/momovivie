import { MOVIE_API_URL, parsedFilteredMovieList } from "@/types/movies";
import Image from "next/image";
import { useRouter } from "next/router";

export default function FilteredMovieList({
  movieList,
}: {
  movieList: parsedFilteredMovieList[];
}) {
  const router = useRouter();
  const moveToDetail = (id: number) => {
    router.push(`/movies/detail/${id}`);
  };
  return (
    <ul>
      {movieList.map((movie) => (
        <li key={movie.id} onClick={() => moveToDetail(movie.id)}>
          <div className="img-container">
            <Image
              src={`${MOVIE_API_URL.IMG}${movie.poster_path}`}
              width={150}
              height={210}
              alt={`${movie.title} 소개`}
              placeholder="blur"
              blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
            />
            <p>평점 : {`${movie.vote_average.toFixed(2)}`}</p>
          </div>
          <div className="movie-info-container">
            <h4>{movie.title}</h4>
            <div className="info-wrapper">
              <p>
                <strong>장르</strong> : {`${movie.genres.join(", ").trim()}`}
              </p>
              <p>
                <strong>댓글 수</strong> : {`${movie.count_comment}개`}
              </p>
              <p>
                <strong>댓글 업데이트</strong> : <br />
                <span className="recent-date-comment">{`${movie.update_comment}`}</span>
              </p>
            </div>
          </div>
        </li>
      ))}
      <style jsx>{`
        ul {
          padding: 15px
          list-style-type: none;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 10px;
        }
        li {
          border-radius: 10px;
          width: 95%;
          padding: 15px;
          background-color: white;
          display: flex;
          cursor: pointer;
          gap: 10px;
        }
        li:hover {
          outline: 2px solid teal;
        }
        .img-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 10px;
        }
        .movie-info-container, 
        .info-wrapper {
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
        }
        .info-wrapper {
          gap: 5px;
        }
        .recent-date-comment {
          font-size: 13px;
        }
      `}</style>
    </ul>
  );
}
