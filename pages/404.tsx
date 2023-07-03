import Seo from "@/components/Seo";
import Image from "next/image";
import icon404 from "../public/icon404.svg";
import useTypingAnimation from "@/hooks/useTypingAnimation";

export default function Custom404() {
  const typing = useTypingAnimation("페이지를 찾을 수 없습니다!", 100);

  return (
    <div className="container">
      <Seo title="404 | Momovivie"></Seo>
      <Image
        src={icon404}
        alt="404 에러"
        width={200}
        height={200}
        priority={true}
      ></Image>
      <h2>잘못된 경로!</h2>
      <p>{typing}</p>
      <style jsx>{`
        .container {
          margin: 20px auto 40px;
          gap: 10px;
          font-family: "DungGeunMo";
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  );
}
