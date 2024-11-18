import React from "react";
import styles from "./index.module.scss";
import Tag from "../Tag";
import Tags from "../Tags";

const SearchResult = (props) => {
  const {
    title,
    description,
    createdAt,
    updatedAt,
    languages,
    tags,
    pushedAt,
  } = props;

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
        <h3>{title}</h3>
        <p>{description}</p>
        <p>
          {languages && <strong>Languages:</strong>}
          {languages && languages}
        </p>
        <div className={styles.tagsContainer}>
          <Tags tags={tags} />
        </div>
      </div>
      <div className={styles.resultRight}>
        <p>
          <strong>Created At: </strong>
          {/* FIXME: use proper date format */}
          {createdAt && formatDate(createdAt)}
        </p>
        <p>
          <strong>Updated At: </strong>
          {/* FIXME: use proper date format */}
          {updatedAt && formatDate(updatedAt)}
        </p>
        <p>
          <strong>Latest Push On: </strong>
          {/* FIXME: use proper date format */}

          {pushedAt && formatDate(pushedAt)}
        </p>
      </div>
    </div>
  );
};

export default SearchResult;
