import "normalize.css";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import { config } from "@fortawesome/fontawesome-svg-core";
import { MovieCommentedContextProvider } from "@/context/FilteredMovieContext";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <MovieCommentedContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MovieCommentedContextProvider>
    </div>
  );
}
