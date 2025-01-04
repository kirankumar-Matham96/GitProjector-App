import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  githubSelector,
  getContents,
  clearContents,
} from "../../redux/githubSlice";
import { useState } from "react";
import Button from "../Button";

const Content = ({ name }) => {
  const [path, setPath] = useState([]);
  const { repoContents } = useSelector(githubSelector);
  console.log("🚀 ~ Content ~ repoContents:", repoContents);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("🚀 ~ useEffect ~ before dispatch:", { name, path });

    dispatch(
      getContents({
        repoName: name,
        path: path.length > 0 ? path.join("") : "",
      })
    );

    return () => {
      dispatch(clearContents());
    };
  }, [dispatch, path]);

  const handleContentSelect = (pathFragment) => {
    if (path.length > 0) {
      setPath([...path, "/" + pathFragment]);
    } else {
      setPath([pathFragment]);
    }
  };

  const handleBack = () => {
    setPath((prevState) => prevState.slice(0, -1));
  };

  return (
    <div>
      {path.length > 0 && <Button onClick={handleBack}>Back {"<=="}</Button>}
      {Array.isArray(repoContents) && (
        <ul>
          {repoContents?.map((content) => (
            <li
              key={content.sha}
              onClick={() => handleContentSelect(content.name)}
            >
              {content.name} {content.type}
            </li>
          ))}
        </ul>
      )}
      {!Array.isArray(repoContents) && (
        <div>
          <h3>
            {repoContents.name} - {repoContents.type}
          </h3>
          <p>{repoContents.content}</p>
        </div>
      )}
    </div>
  );
};

export default Content;
