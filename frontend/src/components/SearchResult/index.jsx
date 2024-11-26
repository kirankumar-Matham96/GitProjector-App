import React from "react";
import styles from "./index.module.scss";
import Tags from "../Tags";

const SearchResult = (props) => {
  const { title, description, createdAt, languages, tags, pushedAt } = props;
  console.log("🚀 ~ SearchResult ~ languages:", languages);

  const languageKeys = Object.keys(languages);
  console.log("🚀 ~ SearchResult ~ languageKeys:", languageKeys);

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
        <h4>{title}</h4>
        <p>{description}</p>
        <p>
          {languageKeys.length > 0 && (
            <div>
              <strong>Languages: </strong>
              {languageKeys.map((languageKey, index) => (
                <span>
                  {languageKey}
                  {languageKeys.length - 1 !== index && ", "}
                </span>
              ))}
            </div>
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
