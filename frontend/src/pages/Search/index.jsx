import { AiOutlineSearch } from "react-icons/ai";
import Input from "../../components/Input";
import styles from "./index.module.scss";
import { useEffect } from "react";

const Search = () => {

  useEffect(() => {
    
  },[]);

  return (
    <div className={styles.bgContainer}>
      <div className={styles.searchContainer}>
        <div className={styles.search}>
          <div className={styles.searchIcon}>
            <AiOutlineSearch />
          </div>

          <Input type="search" name="search" id="search" placeholder="Search" />
        </div>
      </div>
      <h2>if new? Ask for the github token</h2>
      <h2>if not? show the search page</h2>
    </div>
  );
};

export default Search;
