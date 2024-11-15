import { useEffect } from "react";
import { useSelector } from "react-redux";
import SearchBox from "../../components/SearchBox";
import SearchResults from "../../components/SearchResults";
import GithubAuth from "../../components/GithubAuth";
import { githubSelector } from "../../redux/githubSlice";
import styles from "./index.module.scss";

const Search = () => {
  const { userId } = useSelector(githubSelector);

  useEffect(() => {
    console.log("🚀 ~ useEffect ~ userId:", userId);
    if (userId) {
    }
  });

  return (
    <div className={styles.bgContainer}>
      <div>
        <SearchBox />
      </div>
      <div>
        <SearchResults />
        <GithubAuth />
      </div>
      {/* | For ref | */}
      <div>
        <h2>if new? Ask for the github token</h2>
        <h2>if not? show the search page</h2>
      </div>
    </div>
  );
};

export default Search;
