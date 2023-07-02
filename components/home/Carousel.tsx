import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MOVIE_API_URL, MoviePoster } from "@/types/movies";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  arrows: false,
  pauseOnFocus: true,
  pauseOnHover: true,
  autoplaySpeed: 4000,
};

function CustionSlide({ movie }: any) {
  return (
    <div className="slider-container">
      <Image
        src={`${MOVIE_API_URL.IMG}${movie.poster_path}`}
        alt={`${movie.title} 포스터`}
        width={250}
        height={350}
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
        }
      `}</style>
    </div>
  );
}

export default function Carousel({ movieList }: { movieList?: MoviePoster[] }) {
  return (
    <>
      {movieList ? (
        <section className="section-random-slider">
          <Slider {...settings}>
            {movieList.map((movie) => (
              <CustionSlide movie={movie} />
            ))}
          </Slider>
        </section>
      ) : null}
      <style jsx>{`
        .section-random-slider {
          margin: 0 auto;
          width: 325px;
        }
      `}</style>
    </>
  );
}
