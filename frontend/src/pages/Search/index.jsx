import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBox from "../../components/SearchBox";
import SearchResults from "../../components/SearchResults";
import GithubAuth from "../../components/GithubAuth";
import { githubSelector, getAllRepos } from "../../redux/githubSlice";
import Sort from "../../components/Sort";
import Pagination from "../../components/Pagination";
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

  return (
    <div className={styles.bgContainer}>
      <div>
        <SearchBox />
      </div>

      <div className={styles.resultsContainer}>
        {/* {user ? <SearchResults /> : <GithubAuth />} */}

        {user ? (
          <div className={styles.resultsPageContent}>
            <div className={styles.sort}>
              <Sort />
            </div>
            <div>
              <SearchResults />
            </div>
          </div>
        ) : (
          <GithubAuth />
        )}
      </div>
      <div>
        <Pagination />
      </div>
    </div>
  );
};

export default Search;
