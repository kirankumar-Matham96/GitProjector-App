import { AiOutlineSearch } from "react-icons/ai";
import Input from "../../components/Input";
import { useRef } from "react";
import styles from "./index.module.scss";

const SearchBox = () => {
    const search = useRef();

    const onChange = (e) => {
    console.log("🚀 ~ onChange ~ search:", search.current.value);
    // here dispatch search api towards github
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
