import React from "react";
import styles from "./index.module.scss";

const Tag = ({ tag }) => {
  return <div className={styles.tag}>{tag}</div>;
};

export default Tag;
