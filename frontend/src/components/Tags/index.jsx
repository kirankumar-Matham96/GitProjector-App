import Tag from "../Tag";
import styles from "./index.module.scss";

const Tags = (props) => {
  const { tags, className } = props;
  console.log("🚀 ~ Tags ~ className:", className)
  return (
    <ul className={styles.tagsContainer}>
      <strong>{tags.length > 0 && "Tags:"}</strong>
      <div className={styles.tagsInnerContainer}>
        {tags.length > 0 &&
          tags.map((tag) => (
            <li key={tag}>
              <Tag className={className}>{tag}</Tag>
            </li>
          ))}
      </div>
    </ul>
  );
};

export default Tags;
