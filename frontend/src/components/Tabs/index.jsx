import React from "react";
import { setCurrentTab, githubSelector } from "../../redux/githubSlice";
import { useDispatch, useSelector } from "react-redux";
import styles from "./index.module.scss";

const Tabs = ({ tabs }) => {
  const { currentTab } = useSelector(githubSelector);

  const dispatch = useDispatch();

  const handleClick = (tab) => {
    dispatch(setCurrentTab(tab || "readme"));
  };

  return (
    <ul className={styles.tabsContainer}>
      {tabs.map((tab) => (
        <li
          key={tab}
          role="tab"
          aria-selected={currentTab === tab}
          className={
            styles.tab + " " + (currentTab === tab ? styles.active : "")
          }
          onClick={() => handleClick(tab)}
        >
          {tab}
        </li>
      ))}
    </ul>
  );
};

export default Tabs;
