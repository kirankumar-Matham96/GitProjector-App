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
  return (
    <ul>
      {commits && commits.length > 0 ? (
        commits.map((commit) => {
          const formattedDate = useFormatDate(commit.commit.committer.date);

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
