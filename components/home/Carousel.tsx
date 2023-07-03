import { useCallback, useState } from "react";
import useMoveToDetail from "@/hooks/useMoveToDetail";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MoviePoster } from "@/types/movies";
import CarouselSlice from "./CarouselSlice";
import Loading from "../share/Loading";

export default function Carousel({ movieList }: { movieList?: MoviePoster[] }) {
  const [dragging, setDragging] = useState(false);
  const { moveToDetail } = useMoveToDetail();

  const handleBeforeChange = useCallback(() => {
    setDragging(true);
  }, [dragging]);

  const handleAfterChange = useCallback(() => {
    setDragging(false);
  }, [dragging]);

  const moveTo = useCallback(
    (id: number) => {
      dragging ? null : moveToDetail(id);
    },
    [dragging]
  );

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
    draggable: true,
    beforeChange: handleBeforeChange,
    afterChange: handleAfterChange,
  };

  return (
    <>
      {movieList ? (
        <section className="section-random-slider">
          <Slider {...settings}>
            {movieList.map((movie) => (
              <CarouselSlice
                movie={movie}
                key={movie.id}
                onClickCard={moveTo}
              />
            ))}
          </Slider>
        </section>
      ) : (
        <Loading />
      )}
      <style jsx>{`
        .section-random-slider {
          margin: 0 auto;
          width: 325px;
        }
      `}</style>
    </>
  );
}
