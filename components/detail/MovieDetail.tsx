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
          width={375}
          height={275}
          alt={`${movieDetail.title} 소개`}
          placeholder="blur"
          blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
          style={imageStyle}
        ></Image>
      </div>
      <div className="info-container">
        <h3>{movieDetail.title}</h3>
        <p>({movieDetail.original_title})</p>
        <p>{movieDetail.genres.join(", ").trim()}</p>
        <p>별점: {movieDetail.vote_average.toFixed(2)}</p>
        <details>
          <summary>요약</summary>
          <p>{movieDetail.overview}</p>
        </details>
      </div>
      <style jsx>{`
        .container {
          background-color: #fff;
          font-family: "GmarketSansMedium";
        }
        .img-container {
          margin: 0 auto;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          padding: 20px;
        }
        .info-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        details {
          width: 95%;
          border: 1px solid #ccc;
          border-radius: 10px;
          padding: 0.5em 0.5em 0;
          margin: 1rem auto 0.5rem;
        }
        summary {
          font-weight: bold;
          margin: -0.5em -0.5em 0;
          padding: 0.5em;
          cursor: pointer;
        }
        details[open] {
          padding: 0.5em;
        }
        details[open] summary {
          border-bottom: 1px solid #aaa;
          margin-bottom: 0.5em;
          background-color: #fff0c0;
          border-radius: 10px 10px 0 0;
        }
        details p {
          padding: 10px;
          line-height: 1.2rem;
        }
      `}</style>
    </div>
  );
}
