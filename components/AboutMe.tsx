import Image from "next/image";
import githubLogo from "../public/github-logo.png";
import blogLogo from "../public/blog.png";
import gmailLogo from "../public/gmail.png";
import Link from "next/link";

export default function AboutMe() {
  return (
    <article>
      <div>
        <h2>connect me</h2>
        <div className="connect-box">
          <Link
            href="https://github.com/2duckchun"
            className="connect-logo"
            legacyBehavior
          >
            <a target="_blank">
              <Image
                src={githubLogo}
                alt="깃허브 로고"
                width={64}
                height={64}
              ></Image>
            </a>
          </Link>
          <Link
            href="https://2duckchun.tistory.com/"
            className="connect-logo"
            legacyBehavior
          >
            <a target="_blank">
              <Image
                src={blogLogo}
                alt="블로그 로고"
                width={64}
                height={64}
              ></Image>
            </a>
          </Link>
          <Link
            href="mailto:kkts9308@gmail.com"
            className="connect-logo"
            legacyBehavior
          >
            <a target="_blank">
              <Image
                src={gmailLogo}
                alt="이메일 로고"
                width={64}
                height={64}
              ></Image>
            </a>
          </Link>
        </div>
      </div>
      <style jsx>{`
        article {
          font-family: "DungGeunMo";
          border-radius: 10px;
          width: 90%;
          margin: 20px auto;
          padding: 20px;
          border: 2px solid black;
          animation: appear 1s ease-in-out 0s 1 normal forwards;
        }
        h2 {
          text-align: center;
        }
        .connect-box {
          margin-top: 30px;
          display: flex;
          justify-content: space-around;
          align-items: center;
        }
        @keyframes appear {
          0% {
            opacity: 0;
            height: 0;
          }
          75% {
            opacity: 0.7;
            height: 230px;
          }
          100% {
            opacity: 1;
            height: 200px;
          }
        }
      `}</style>
    </article>
  );
}
