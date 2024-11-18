import Tag from "../Tag";
import styles from "./index.module.scss";

const Tags = ({ tags }) => {
  return (
    <ul className={styles.tagsContainer}>
      <strong>{tags.length > 0 && "Tags:"}</strong>
      <div className={styles.tagsInnerContainer}>
        {tags.length > 0 &&
          tags.map((tag) => (
            <li key={tag}>
              <Tag tag={tag} />
            </li>
          ))}
      </div>
    </ul>
  );
};

export default Tags;
