import { useCommentedDispatchContext } from "@/context/FilteredMovieContext";
import { FITERED_MOVIE_ACTION } from "@/types/movies";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();
  const commentedDispatch = useCommentedDispatchContext();
  const moveTo = (path: string) => {
    if (
      router.pathname === "/movies/detail/[id]" ||
      router.pathname === "/commented"
    ) {
      commentedDispatch({
        type: FITERED_MOVIE_ACTION.INITIAL_FILTER,
      });
    }

    router.push(path);
  };
  return (
    <nav>
      <h1
        className={router.pathname === "/" ? "active" : ""}
        onClick={() => moveTo("/")}
      >
        MOMOVIVIE
      </h1>
      <div className="back-button" onClick={() => router.back()}>
        <FontAwesomeIcon icon={faArrowLeft} size="xl" />
      </div>
      <div>
        <div onClick={() => moveTo("/movies/1")}>
          <a
            className={
              router.pathname === "/movies/[page]" ||
              router.pathname === "/movies/detail/[id]"
                ? "active"
                : ""
            }
          >
            Movies
          </a>
        </div>
        <div onClick={() => moveTo("/commented")}>
          <a className={router.pathname === "/commented" ? "active" : ""}>
            Commented
          </a>
        </div>
        <div onClick={() => moveTo("/about")}>
          <a className={router.pathname === "/about" ? "active" : ""}>About</a>
        </div>
      </div>
      <style jsx>{`
        nav {
          position: relative;
          display: flex;
          gap: 10px;
          flex-direction: column;
          align-items: center;
          padding-top: 20px;
          padding-bottom: 10px;
          box-shadow: rgba(50, 50, 93, 0.15) 0px 20px 30px -15px,
            rgba(0, 0, 0, 0.15) 0px 20px 30px -20px;
        }
        .back-button {
          position: absolute;
          left: 20px;
          top: 50px;
          width: 24px;
          height: 24px;
          cursor: pointer;
        }
        nav a {
          font-size: 1rem;
          font-family: "GmarketSansMedium";
        }
        h1 {
          cursor: pointer;
          font-weight: 1000;
          font-family: "GmarketSansMedium";
        }
        .active {
          color: teal;
          font-weight: 1000;
        }
        nav div {
          display: flex;
          gap: 10px;
        }
      `}</style>
    </nav>
  );
}
