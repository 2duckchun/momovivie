import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta property="og:title" content="Momovivie" />
        <meta
          property="og:site_name"
          content="영화가 보고싶은데 볼 영화가 없다면 여기서 찾아보세요."
        />
        <meta property="og:url" content="https://momovivie-2dc.web.app/" />
        <meta
          property="og:description"
          content="보고싶은 영화를 찾아보세요! 영화는 평점 순으로 10,000개가 준비되어 있습니다!"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://cdn.pixabay.com/photo/2019/04/24/21/55/cinema-4153289_1280.jpg"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
