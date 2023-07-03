import Seo from "@/components/Seo";
import { useMemo } from "react";
import Carousel from "@/components/home/Carousel";
import useGetMovieCollectionList from "@/hooks/useGetRandomMovieList";
import getRandomMovieList from "@/utils/getRandomMovieList";
import useTypingAnimation from "@/hooks/useTypingAnimation";

export default function Home() {
  const movieList = useGetMovieCollectionList();
  const randomMovieList = useMemo(() => {
    return getRandomMovieList(movieList);
  }, [movieList]);

  const welcomeMessage =
    "보고싶은 영화를 찾아보시고\n재미있게 보신 영화가 있으시다면\n감상평을 공유해주세요!";

  const typing = useTypingAnimation(welcomeMessage);

  return (
    <div className="container">
      <Seo title="Home | Momovivie"></Seo>
      <p className="welcome-message">
        {typing}
        <span className="blink">|</span>
      </p>
      <Carousel movieList={randomMovieList} />
      <style jsx>{`
        .welcome-message {
          margin: 20px auto;
          text-align: center;
          min-height: 70px;
          font-family: "DungGeunMo";
          white-space: pre-wrap;
          font-size: 1.1rem;
        }
        .blink {
          animation: blink-effect 1s step-end infinite;
        }
      `}</style>
    </div>
  );
}
