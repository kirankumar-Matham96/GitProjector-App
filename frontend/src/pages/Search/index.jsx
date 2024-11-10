import SearchBox from "../../components/SearchBox";
import SearchResults from "../../components/SearchResults";
import styles from "./index.module.scss";

const Search = () => {
  return (
    <div className={styles.bgContainer}>
      <div>
        <SearchBox />
      </div>
      <div>
        <SearchResults />
        
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
