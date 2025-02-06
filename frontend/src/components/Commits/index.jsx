import React from "react";
import { useEffect } from "react";
import { githubSelector, getCommits } from "../../redux/githubSlice";
import { useSelector, useDispatch } from "react-redux";

export const Commits = (props) => {
  const { name } = props;
  const dispatch = useDispatch();
  const { commits } = useSelector(githubSelector);
  useEffect(() => {
    dispatch(getCommits(name));
  }, [dispatch]);
  return (
    <ul>
      {console.log("🚀 ~ Commits ~ commits:", commits)}
      {commits && commits.length > 0 ? (
        commits.map((commit) => (
          <li key={commit.sha}>
            {commit.commit.message} - {commit.commit.committer.name}
          </li>
        ))
      ) : (
        <p>No Commits Found!</p>
      )}
    </ul>
  );
};
