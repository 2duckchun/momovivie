import Image from "next/image";
import Seo from "../Seo";
import { MOVIE_API_URL, MovieDetailInComponent } from "@/types/movies";

export default function MovieDetail({ movieDetail }: MovieDetailInComponent) {
  const imageStyle = {
    borderRadius: "15px",
    border: "1px solid gray",
  };

  return (
    <div className="container">
      <Seo title={`${movieDetail.title} | Momovivie`}></Seo>
      <div className="img-container">
        <Image
          src={`${MOVIE_API_URL.IMG}${movieDetail.backdrop_path}`}
          width={400}
          height={300}
          alt={`${movieDetail.title} 소개`}
          placeholder="blur"
          blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
          style={imageStyle}
        ></Image>
      </div>
      <h3>{movieDetail.title}</h3>
      <p>({movieDetail.original_title})</p>
      <p>{movieDetail.genres.join(", ").trim()}</p>
      <details>
        <summary>요약</summary>
        <p>{movieDetail.overview}</p>
      </details>
      <p>별점: {movieDetail.vote_average.toFixed(2)}</p>
      <style jsx>{`
        .container {
          background-color: #fff;
        }
        .img-container {
          margin: 0 auto;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          padding: 20px;
        }
      `}</style>
    </div>
  );
}
