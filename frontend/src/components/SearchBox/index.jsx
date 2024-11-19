import { AiOutlineSearch } from "react-icons/ai";
import Input from "../../components/Input";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { searchFilter } from "../../redux/githubSlice.js";
import styles from "./index.module.scss";

const SearchBox = () => {
  const search = useRef();
  const dispatch = useDispatch();

  const onChange = (e) => {
    dispatch(searchFilter(search.current.value));
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.search}>
        <div className={styles.searchIcon}>
          <AiOutlineSearch />
        </div>
        <Input
          type="search"
          ref={search}
          onChange={onChange}
          name="search"
          id="search"
          placeholder="Search"
        />
      </div>
    </div>
  );
};

export default SearchBox;
