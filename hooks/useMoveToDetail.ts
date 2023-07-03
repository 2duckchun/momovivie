import { useRouter } from "next/router";

export default function useMoveToDetail() {
  const router = useRouter();

  const moveToDetail = (id: number) => {
    router.push(`/movies/detail/${id}`);
  };

  return { moveToDetail };
}
