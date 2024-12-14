import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { githubSelector, getIssues } from "../../redux/githubSlice";
import { useEffect } from "react";

export const Issues = ({ name }) => {
  const { issues } = useSelector(githubSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIssues(name));
  }, [dispatch]);

  return (
    <ul>
      {issues?.length === 0 ? (
        <p>No issues!</p>
      ) : (
        issues?.map((issue) => (
          <li key={issue.id}>
            <h3>{issue.title}</h3>
            <p>{issue.body}</p>
          </li>
        ))
      )}
    </ul>
  );
};
