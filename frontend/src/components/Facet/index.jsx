import { useState } from "react";
import Button from "../Button";
import Input from "../Input";
import { facetFilter } from "../../redux/githubSlice.js";
import styles from "./index.module.scss";
import { useDispatch } from "react-redux";

const Facet = ({ title, options }) => {
  const modifiedTitle = title === "Tags" ? "topics" : title.toLowerCase();

  const [selected, setSelected] = useState([]);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { id, checked } = e.target;
    const updatedSelection = checked
      ? [...selected, id.toLowerCase().split("_")[0]]
      : selected.filter((option) => option !== id.toLowerCase().split("_")[0]);
    setSelected(updatedSelection);
    dispatch(
      facetFilter({
        title: modifiedTitle,
        options: updatedSelection,
      })
    );
  };

  const handleClearFilter = () => {
    setSelected([]);
    dispatch(facetFilter({ title: modifiedTitle, options: [] }));
  };

  return (
    <div className={styles.facetContainer}>
      <div className={styles.titelSection}>
        <h4>{title}</h4>
        <Button className={styles.clearBtn} onClick={handleClearFilter}>
          x
        </Button>
      </div>

      <ul className={styles.facetListContainer}>
        {options.map((option, index) => {
          return (
            <li className={styles.listItem} key={`${option}_${index}`}>
              <Input
                onChange={handleChange}
                type="checkbox"
                className={styles.checkbox}
                id={`${option.toLowerCase()}_${index}`}
                checked={selected.includes(option.toLowerCase())}
              />
              &nbsp;
              <label htmlFor={`${option.toLowerCase()}_${index}`}>
                {option}
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Facet;
