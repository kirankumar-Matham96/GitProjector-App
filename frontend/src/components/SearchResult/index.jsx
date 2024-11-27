import { Link } from "react-router-dom";
import styles from "./index.module.scss";
import Tags from "../Tags";

const SearchResult = (props) => {
  const { title, description, createdAt, languages, tags, pushedAt } = props;
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1
    }-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`;
  };

  return (
    <div className={styles.resultContainer}>
      <div className={styles.resultLeft}>
        <h4>
          <Link to={`/repo_details/${title}`}>{title}</Link>
        </h4>
        <p>{description}</p>
        <p>
          {languages.length > 0 && (
            <span>
              <strong>Languages: </strong>
              {languages.map((language, index) => (
                <span key={`${language}_${index}`}>
                  {language}
                  {languages.length - 1 !== index && ", "}
                </span>
              ))}
            </span>
          )}
        </p>
        <div className={styles.tagsContainer}>
          <Tags tags={tags} />
        </div>
      </div>
      <div className={styles.resultRight}>
        <div>
          <p>
            <strong>Created At: </strong>
            {createdAt && formatDate(createdAt)}
          </p>
          <p>
            <strong>Updated At: </strong>
            {pushedAt && formatDate(pushedAt)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
