import React from "react";
import styles from "./index.module.scss";

const Tag = (props) => {
  return (
    <div className={styles.tag + " " + props.className}>{props.children}</div>
  );
};

export default Tag;
