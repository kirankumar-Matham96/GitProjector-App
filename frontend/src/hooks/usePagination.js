import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { githubSelector, paginationFilter } from "../redux/githubSlice";

export const usePagination = () => {
  const [perPageResults, setPerPageResults] = useState(10);

  const dispatch = useDispatch();
  const { filteredRepos, currentPage, perPage } = useSelector(githubSelector);

  const totalPages = Math.ceil(filteredRepos.length / perPageResults);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      dispatch(paginationFilter({ page, perPage: perPageResults }));
    }
  };

  return {
    // paginatedData,
    currentPage,
    totalPages,
    goToPage,
    setPerPageResults,
    nextPage: () => goToPage(currentPage + 1),
    prevPage: () => goToPage(currentPage - 1),
  };
};
