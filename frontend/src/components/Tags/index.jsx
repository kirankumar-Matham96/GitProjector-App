import { useState } from "react";
import Tag from "../Tag";
import Button from "../Button";
import styles from "./index.module.scss";

const Tags = ({ tags }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpandCollapse = () => {
    setIsExpanded((prevState) => !prevState);
  };

  return (
    <ul className={styles.tagsContainer}>
      <strong>Tags:</strong>
      <div className={styles.tagsInnerContainer}>
        {tags.length > 0 &&
          tags.map((tag, index) => {
            if (tags.length < 7) {
              return (
                <li key={tag}>
                  <Tag tag={tag} />
                </li>
              );
            }

            if (!isExpanded && index < 6) {
              return (
                <li key={tag}>
                  <Tag tag={tag} />
                </li>
              );
            }

            if (isExpanded) {
              return (
                <li key={tag}>
                  <Tag tag={tag} />
                </li>
              );
            }
          })}
      </div>
      {tags.length > 6 && !isExpanded && (
        <Button onClick={handleExpandCollapse}>+ more</Button>
      )}
      {tags.length > 6 && isExpanded && (
        <Button onClick={handleExpandCollapse}>- less</Button>
      )}
    </ul>
  );
};

export default Tags;
