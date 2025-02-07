import React from "react";
import { useEffect } from "react";
import { githubSelector, getCommits } from "../../redux/githubSlice";
import { useSelector, useDispatch } from "react-redux";
import { useFormatDate } from "../../hooks/useFormatDate";
import styles from "./index.module.scss";

export const Commits = (props) => {
  const { name } = props;
  const dispatch = useDispatch();
  const { commits } = useSelector(githubSelector);

  useEffect(() => {
    dispatch(getCommits(name));
  }, [dispatch]);

  const handleDateFormat = (dateStr, format = "YYYY-MM-DD HH:mm:ss") => {
    // useFormatDate(dateStr);

    let formattedDate = "";

    if (!dateStr) return;
    const dateObj = new Date(dateStr);

    if (isNaN(dateObj)) {
      formattedDate = "Invalid Date";
      return;
    }

    const pad = (num) => String(num).padStart(2, "0");

    const month = pad(dateObj.getMonth() + 1);
    const day = pad(dateObj.getDate());
    const year = pad(dateObj.getFullYear());
    const hours = pad(dateObj.getHours());
    const minutes = pad(dateObj.getMinutes());
    const seconds = pad(dateObj.getSeconds());

    formattedDate = format
      .replace("YYYY", year)
      .replace("MM", month)
      .replace("DD", day)
      .replace("HH", hours)
      .replace("mm", minutes)
      .replace("ss", seconds);
    return formattedDate;
  };

  return (
    <ul>
      {commits && commits.length > 0 ? (
        commits.map((commit) => {
          const formattedDate = handleDateFormat(commit.commit.committer.date);

          return (
            <li className={styles.listItem} key={commit.sha}>
              <p className={styles.commitDateAndAuthor}>
                {formattedDate} - {commit.commit.committer.name}
              </p>
              <p className={styles.commitText}>{commit.commit.message}</p>
            </li>
          );
        })
      ) : (
        <p>No Commits Found!</p>
      )}
    </ul>
  );
};
