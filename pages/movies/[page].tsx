import Pagination from "@/components/Pagination";
import Seo from "@/components/Seo";
import { GetMovieListResult, MOVIE_API_URL } from "@/types/movies";
import type { MovieIndex } from "@/types/movies";
import { useRouter } from "next/router";
import getMovieList from "@/apis/getMovieList";

export default function Home({ movieList, isSuccess }: GetMovieListResult) {
  const router = useRouter();
  const moveToDetail = (id: number) => {
    router.push(`/movies/detail/${id}`);
  };
  return (
    <>
      <div className="container">
        <Seo title="Movies | Momovivie"></Seo>
        {isSuccess &&
          movieList?.map((movie) => (
            <div
              className="movie"
              key={movie.id}
              onClick={() => moveToDetail(movie.id)}
            >
              <img src={`${MOVIE_API_URL.IMG}${movie.poster_path}`} />
              <h4>{movie.title}</h4>
              <div className="movie_info">
                <span>평점:{movie.vote_average}</span>
                <span className="release_date">
                  개봉일:{movie.release_date}
                </span>
              </div>
            </div>
          ))}

        {!isSuccess && "에러처리"}
      </div>
      <Pagination index={router.query.page} />
      <style jsx>{`
        .container {
          position: relative;
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 25px;
        }
        .movie {
          cursor: pointer;
        }
        .movie img {
          min-height: 350px;
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2 ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movie_info {
          display: flex;
          justify-content: space-around;
          align-items: center;
        }
        span {
          font-family: "DungGeunMo";
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
        }
        .movie h4 {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 45px;
          font-size: 18px;
          text-align: center;
        }
        .page {
          width: 30px;
          height: 30px;
          background-color: teal;
        }
      `}</style>
    </>
  );
}

export async function getServerSideProps({ params }: MovieIndex) {
  let index = params.page;
  if (index < 1) {
    return {
      redirect: {
        destination: "/",
      },
      props: {},
    };
  }

  const { movieList, isSuccess } = await getMovieList(index);
  return {
    props: {
      movieList,
      isSuccess,
    },
  };
}
