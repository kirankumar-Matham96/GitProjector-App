import { usePagination } from "../../hooks/usePagination";
import Button from "../Button";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styles from "./index.module.scss"

const Pagination = () => {
  const {
    currentPage,
    totalPages,
    goToPage,
    setPerPageResults,
    nextPage,
    prevPage,
  } = usePagination();

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    // If we're at the beginning or end, adjust range
    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5];
    } else if (currentPage >= totalPages - 2) {
      return [
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    } else {
      return Array.from(
        { length: endPage - startPage + 1 },
        (_, index) => startPage + index
      );
    }
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={styles.pagination}>
      <div className={styles.pager}>
        <Button className={styles.button} onClick={prevPage} disabled={currentPage === 1}>
          <IoIosArrowBack /> Previous
        </Button>
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            disabled={currentPage === page}
          >
            {page}
          </button>
        ))}
        <Button className={styles.button} onClick={nextPage} disabled={currentPage === totalPages}>
          Next <IoIosArrowForward />
        </Button>
      </div>

      <div className={styles.perPage}>
        <Button className={styles.button} onClick={() => setPerPageResults(10)}>10</Button>
        <Button className={styles.button} onClick={() => setPerPageResults(25)}>25</Button>
        <Button className={styles.button} onClick={() => setPerPageResults(50)}>50</Button>
        <Button className={styles.button} onClick={() => setPerPageResults(100)}>100</Button>
      </div>
    </div>
  );
};

export default Pagination;
