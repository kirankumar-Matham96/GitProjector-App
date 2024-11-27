import { useSelector } from "react-redux";
import { githubSelector } from "../../redux/githubSlice";
import SearchResult from "../SearchResult";
import styles from "./index.module.scss";

const SearchResults = () => {
  const { filteredRepos, paginatedRepos } = useSelector(githubSelector);

  return (
    <div className={styles.resultsBgContainer}>
      <h2>Search Results</h2>
      {paginatedRepos.map((repo) => (
        <div className={styles.resultsContainer} key={repo.id}>
          <SearchResult
            title={repo.name}
            description={repo.description}
            tags={repo.topics}
            createdAt={repo.created_at}
            updatedAt={repo.updated_at}
            pushedAt={repo.pushed_at}
            languages={repo.languages}
          />
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
