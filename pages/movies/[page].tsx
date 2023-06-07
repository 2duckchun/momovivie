import Pagination from "@/components/Pagination";
import Seo from "@/components/Seo";
import { MovieApiUrl } from "@/types/movies";
import type { PopularMovieList, MovieIndex } from "@/types/movies";
import { useRouter } from "next/router";

export default function Home({ results }: PopularMovieList) {
  const router = useRouter();

  return (
    <>
      <div className="container">
        <Seo title="Home | Momovivie"></Seo>
        {results?.map((movie) => (
          <div className="movie" key={movie.id}>
            <img src={`${MovieApiUrl.IMG}${movie.poster_path}`} />
            <h4>{movie.original_title}</h4>
            <div className="movie_info">
              <span>평점:{movie.vote_average}</span>
              <span className="release_date">개봉일:{movie.release_date}</span>
            </div>
          </div>
        ))}
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
  const url = `${MovieApiUrl.MOVIE_LIST_KO}&page=${index}&api_key=${process.env.API_KEY}`;
  const { results } = await (await fetch(url)).json();
  return {
    props: {
      results,
    },
  };
}
