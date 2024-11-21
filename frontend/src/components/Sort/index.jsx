import { useState, useEffect, useRef } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { sortByDate } from "../../redux/githubSlice";
import styles from "./index.module.scss";

const Sort = () => {
  const dispatch = useDispatch();

  const [sortValue, setSortValue] = useState("Created Date Ascending");

  const [show, setShow] = useState(false);

  const sortMenu = useRef();

  const sortOptions = [
    {
      value: "createdDateAsc",
      title: "Created Date Ascending",
    },
    {
      value: "createdDateDesc",
      title: "Created Date Descending",
    },
    {
      value: "updatedDateAsc",
      title: "Updated Date Ascending",
    },
    {
      value: "updatedDateDesc",
      title: "Updated Date Descending",
    },
  ];

  const handleOptionSelection = (value) => {
    setSortValue(value);
    setShow((prevState) => !prevState);
    const selectedOption = sortOptions.find((option) => option.title === value);
    dispatch(sortByDate(selectedOption.value));
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (sortMenu?.current && !sortMenu?.current.contains(e.target)) {
        setShow(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.addEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className={styles.sortContainer}>
      <div
        className={styles.sortSelectedOptionContainer}
        ref={sortMenu}
        onClick={() => setShow((prevState) => !prevState)}
      >
        <div className={styles.sortSelectedOption}>{sortValue} </div>
        <div className={styles.sortSelectedOptionIcon}>
          {sortValue.includes("Asc") ? <IoIosArrowDown /> : <IoIosArrowUp />}
        </div>
      </div>
      <ul
        className={styles.sortOptionsContainer + " " + (show ? "show" : "hide")}
      >
        {sortOptions.map((option) => (
          <li
            className={styles.sortOption}
            key={option.title}
            onClick={() => handleOptionSelection(option.title)}
          >
            {option.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sort;
