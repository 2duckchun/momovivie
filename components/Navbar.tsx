import Link from "next/link";
import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();
  const moveToHome = () => {
    router.push("/");
  };

  return (
    <nav>
      <h1
        className={router.pathname === "/" ? "active" : ""}
        onClick={() => moveToHome()}
      >
        MOMOVIVIE
      </h1>
      <div>
        <Link href="/movies/1" legacyBehavior>
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
        </Link>
        <Link href="/commented" legacyBehavior>
          <a className={router.pathname === "/commented" ? "active" : ""}>
            Commented
          </a>
        </Link>
        <Link href="/about" legacyBehavior>
          <a className={router.pathname === "/about" ? "active" : ""}>About</a>
        </Link>
      </div>
      <style jsx>{`
        nav {
          display: flex;
          gap: 10px;
          flex-direction: column;
          align-items: center;
          padding-top: 20px;
          padding-bottom: 10px;
          box-shadow: rgba(50, 50, 93, 0.15) 0px 20px 30px -15px,
            rgba(0, 0, 0, 0.15) 0px 20px 30px -20px;
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
