import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { githubSelector } from "../../redux/githubSlice";
import SearchResult from "../SearchResult";
import styles from "./index.module.scss";

const SearchResults = () => {
  const { repos } = useSelector(githubSelector);
  console.log("\n\n\n🚀 ~ SearchResults ~ repos:", repos, "\n\n\n");
  // const dispatch = useDispatch();

  return (
    <div className={styles.resultsBgContainer}>
      <h2>Search Results</h2>
      {repos.map((repo) => (
        <div className={styles.resultsContainer} key={repo.id}>
          <SearchResult
            title={repo.name}
            description={repo.description}
            tags={repo.topics}
            createdAt={repo.created_at}
            updatedAt={repo.updated_at}
            pushedAt={repo.pushed_at}
            languages={repo.language}
          />
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
