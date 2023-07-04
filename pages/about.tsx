import AboutMe from "@/components/about/AboutMe";
import Seo from "@/components/Seo";
import useTypingAnimation from "@/hooks/useTypingAnimation";

export default function About() {
  const message =
    "안녕하세요.  \n이 프로젝트는 Next.JS를 배우기 위해 \n만들어본 토이프로젝트 입니다.  \n노마드코더 강의에서 영감을 얻었습니다.   \n사용하다가 불편한 점이 있으시다면 \n아래로 연락해주세요!   \n그럼 즐거운 시간 보내시기 바랍니다!";

  const typing = useTypingAnimation(message, 20);
  return (
    <div className="container">
      <Seo title="About | Momovivie"></Seo>
      <p className="message">{typing}</p>
      {typing.length === message.length && <AboutMe />}
      <style jsx>{`
        .message {
          width: 90%;
          margin: 30px auto 30px;
          line-height: 1.5rem;
          font-family: "DungGeunMo";
          font-size: 1.1rem;
          white-space: break-spaces;
        }
      `}</style>
    </div>
  );
}
