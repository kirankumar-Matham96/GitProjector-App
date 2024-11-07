import React from "react";
import styles from "./index.module.scss";
const Card = ({ children, ...props }) => {
  return <div className={styles.card}>{children}</div>;
};

export default Card;
