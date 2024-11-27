import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBox from "../../components/SearchBox";
import SearchResults from "../../components/SearchResults";
import GithubAuth from "../../components/GithubAuth";
import { githubSelector, getAllRepos } from "../../redux/githubSlice";
import Sort from "../../components/Sort";
import Pagination from "../../components/Pagination";
import Facet from "../../components/Facet";
import styles from "./index.module.scss";

const Search = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const { userId } = useSelector(githubSelector);

  useEffect(() => {
    if (userId) {
      setUser(userId);
      dispatch(getAllRepos());
    }
  }, [userId]);

  const tags = ["react", "node", "mongoDB", "express", "Javascript"];
  const languages = ["Java", "Javascript", "Python", "C", "HTML", "CSS"];
  const types = ["Public", "Private", "Forked"];

  return (
    <div className={styles.bgContainer}>
      {user ? (
        <div className={styles.searchPageContainer}>
          <div className={styles.facetsContainer}>
            <Facet title="Tags" options={tags} />
            <Facet title="Languages" options={languages} />
          </div>
          <div className={styles.mainSearchContainer}>
            <div className={styles.searchBoxContainer}>
              <SearchBox />
            </div>
            <div className={styles.sortContainer}>
              <h2>Search Results</h2>
              <Sort />
            </div>
            <div className={styles.resultsContainer}>
              <SearchResults />
            </div>
            <div className={styles.paginationContainer}>
              <Pagination />
            </div>
          </div>
        </div>
      ) : (
        <GithubAuth />
      )}
    </div>
  );
};

export default Search;
