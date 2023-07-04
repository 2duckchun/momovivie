import Pagination from "@/components/movies/Pagination";
import Seo from "@/components/Seo";
import { GetMovieListResult, MOVIE_API_URL } from "@/types/movies";
import type { MovieIndex } from "@/types/movies";
import { useRouter } from "next/router";
import getMovieList from "@/apis/getMovieList";
import Loading from "@/components/share/Loading";
import useMoveToDetail from "@/hooks/useMoveToDetail";
import Image from "next/image";

export default function Home({ movieList, isSuccess }: GetMovieListResult) {
  const router = useRouter();
  const { moveToDetail } = useMoveToDetail();
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
              <Image
                src={`${MOVIE_API_URL.IMG}${movie.poster_path}`}
                alt={`${movie.title} 영화 포스터`}
                width={170}
                height={250}
                priority={true}
                placeholder="blur"
                blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
              />
              {/* <img src={`${MOVIE_API_URL.IMG}${movie.poster_path}`} /> */}
              <h4>{movie.title}</h4>
              <div className="movie_info">
                <span>평점:{movie.vote_average}</span>
                <span className="release_date">
                  개봉일:{movie.release_date}
                </span>
              </div>
            </div>
          ))}

        {!isSuccess && <Loading />}
      </div>
      <Pagination index={router.query.page} />
      <style jsx>{`
        .container {
          padding: 5px;
          margin-top: 20px;
          position: relative;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .movie {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }
        .movie img {
          min-height: 250px;
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
          font-size: 1.1rem;
          text-align: center;
        }
        .page {
          width: 30px;
          height: 30px;
          background-color: teal;
        }
        @media (max-width: 500px) {
          .movie_info {
            flex-direction: column;
          }
        }
      `}</style>
    </>
  );
}

export async function getServerSideProps({ params }: MovieIndex) {
  let index = params.page;

  if (index < 1 || isNaN(params.page)) {
    return {
      redirect: {
        destination: "/movies/1",
      },
      props: {},
    };
  }

  if (index > 500) {
    return {
      redirect: {
        destination: "/movies/500",
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
