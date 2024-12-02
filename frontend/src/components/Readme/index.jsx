import { githubSelector, getReadme } from "../../redux/githubSlice";
import { useDispatch, useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import "github-markdown-css";
import { useEffect } from "react";

const Readme = ({ name }) => {
  const dispatch = useDispatch();

  const { readmeContent, isLoading } = useSelector(githubSelector);

  useEffect(() => {
    dispatch(getReadme(name));
  }, [name, dispatch]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!readmeContent) {
    return <p>Readme Not Available</p>;
  }

  return (
    <ReactMarkdown className="markdown-body">{readmeContent}</ReactMarkdown>
  );
};

export default Readme;
