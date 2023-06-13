import { usePagination } from "@/utils/usePagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { NAVIGATE_PAGE } from "@/types/common";

export default function Pagination({ index }: any) {
  const router = useRouter();
  const pageArray = usePagination(parseInt(index));
  const navigateToPage = (navigate: NAVIGATE_PAGE, page: number) => {
    switch (navigate) {
      case NAVIGATE_PAGE.TO_PAGE:
        router.push(`/movies/${page}`);
        break;
      case NAVIGATE_PAGE.TO_LEFT:
        if (page - 10 <= 0) router.push(`/movies/1`);
        else router.push(`/movies/${page - 10}`);
        break;
      case NAVIGATE_PAGE.TO_LEFT_END:
        router.push(`/movies/1`);
        break;
      case NAVIGATE_PAGE.TO_RIGHT:
        if (page + 10 >= 500) router.push(`/movies/500`);
        else router.push(`/movies/${page + 10}`);
        break;
      case NAVIGATE_PAGE.TO_RIGHT_END:
        router.push(`/movies/500`);
        break;
    }
  };

  return (
    <div className="container">
      <div
        className="page_arrow"
        onClick={() =>
          navigateToPage(NAVIGATE_PAGE.TO_LEFT_END, parseInt(index))
        }
      >
        <FontAwesomeIcon icon={faAnglesLeft} size="sm" />
      </div>

      <div
        className="page_arrow"
        onClick={() => navigateToPage(NAVIGATE_PAGE.TO_LEFT, parseInt(index))}
      >
        <FontAwesomeIcon icon={faChevronLeft} size="sm" />
      </div>

      {pageArray?.map((page) => {
        if (page === parseInt(index)) {
          return (
            <div
              className="page current_page"
              key={page}
              onClick={() => navigateToPage(NAVIGATE_PAGE.TO_PAGE, page)}
            >
              {page}
            </div>
          );
        }
        return (
          <div
            className="page"
            key={page}
            onClick={() => navigateToPage(NAVIGATE_PAGE.TO_PAGE, page)}
          >
            {page}
          </div>
        );
      })}
      <div
        className="page_arrow"
        onClick={() => navigateToPage(NAVIGATE_PAGE.TO_RIGHT, parseInt(index))}
      >
        <FontAwesomeIcon icon={faChevronRight} size="sm" />
      </div>

      <div
        className="page_arrow"
        onClick={() =>
          navigateToPage(NAVIGATE_PAGE.TO_RIGHT_END, parseInt(index))
        }
      >
        <FontAwesomeIcon icon={faAnglesRight} size="sm" />
      </div>

      <style jsx>{`
        .container {
          margin-top: 15px;
          display: flex;
          gap: 5px;
          justify-content: space-around;
          align-items: center;
        }
        .page {
          font-family: "DungGeunMo";
          font-size: 16px;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 35px;
          height: 25px;
          cursor: pointer;
          border-radius: 5px;
          border: 1px solid teal;
        }
        .page:hover {
          background-color: #b3e4e4;
        }
        .page.current_page {
          border: 1px solid teal;
          background-color: teal;
        }
        .page_arrow {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 25px;
          height: 25px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
