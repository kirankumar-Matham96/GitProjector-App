import React from "react";
import styles from "./index.module.scss";

const Tag = (props) => {
  const { children, className } = props;
  console.log("🚀 ~ Tag ~ className:", className)
  return <div className={styles.tag + " " + className}>{children}</div>;
};

export default Tag;
