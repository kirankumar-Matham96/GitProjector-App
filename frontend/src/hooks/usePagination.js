import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { githubSelector, paginationFilter } from "../redux/githubSlice";

export const usePagination = () => {
  const [perPageResults, setPerPageResults] = useState(10);

  const dispatch = useDispatch();
  const { filteredRepos, currentPage } = useSelector(githubSelector);

  const totalPages = Math.ceil(filteredRepos.length / perPageResults);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      dispatch(paginationFilter({ page, perPage: perPageResults }));
    }
  };

  const updatePerPageResults = (newPerPage) => {
    setPerPageResults(newPerPage);
    // goToPage(1);
    dispatch(paginationFilter({ page: 1, perPage: newPerPage }));
  };

  return {
    currentPage,
    totalPages,
    goToPage,
    setPerPageResults: updatePerPageResults,
    nextPage: () => goToPage(currentPage + 1),
    prevPage: () => goToPage(currentPage - 1),
  };
};
