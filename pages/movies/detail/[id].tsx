import getMovieDetail from "@/apis/getMovieDetail";
import Seo from "@/components/Seo";
import MovieDetail from "@/components/detail/MovieDetail";
import { GetMovieDetailResult, MovieDetailId } from "@/types/movies";
import { useRouter } from "next/router";

export default function MovieDetailPage({ movieDetail, isSuccess }: GetMovieDetailResult) {
  const router = useRouter();

  // 내부를 컴포넌트로 뺴서
  // movieDetail이 있으면 있는 것으로, 없으면 없다는 것으로 렌더링시킴.
  return isSuccess && movieDetail ? <MovieDetail movieDetail={movieDetail} /> : <div>에러처림다</div>;
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
