import { MOVIE_API_URL } from "@/types/movies";
import Image from "next/image";

export default function CarouselSlide({ movie, onClickCard }: any) {
  return (
    <div className="slider-container" onClick={(e) => onClickCard(movie.id)}>
      <Image
        src={`${MOVIE_API_URL.IMG}${movie.poster_path}`}
        alt={`${movie.title} 포스터`}
        width={250}
        height={350}
        priority={true}
      ></Image>
      <h3>{movie.title}</h3>
      <p>{movie.genres.join(", ")}</p>
      <p>별점 : {movie.vote_average.toFixed(2)}</p>
      <style jsx>{`
        .slider-container {
          width: 325px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }
        h3,
        p {
          margin: 3px;
        }
      `}</style>
    </div>
  );
}
