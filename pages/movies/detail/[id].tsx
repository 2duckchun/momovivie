import getMovieDetail from "@/apis/getMovieDetail";
import MovieDetail from "@/components/detail/MovieDetail";
import MovieDetailComments from "@/components/detail/MovieDetailComment";
import Loading from "@/components/share/Loading";
import addMovieDetail from "@/db/addMovieDetail";
import { GetMovieDetailResult, MovieDetailId } from "@/types/movies";

export default function MovieDetailPage({
  movieDetail,
  isSuccess,
}: GetMovieDetailResult) {
  isSuccess && movieDetail ? addMovieDetail(movieDetail) : null;
  return isSuccess && movieDetail ? (
    <>
      <MovieDetail movieDetail={movieDetail} />
      <MovieDetailComments movieId={movieDetail.id} />
    </>
  ) : (
    <Loading />
  );
}

export async function getServerSideProps({ params }: MovieDetailId) {
  const id = params.id;

  const { movieDetail, isSuccess } = await getMovieDetail(id);
  return {
    props: {
      movieDetail,
      isSuccess,
    },
  };
}
