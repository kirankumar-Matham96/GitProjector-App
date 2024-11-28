import { githubSelector, getReadme } from "../../redux/githubSlice";
import { useDispatch, useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import { useEffect } from "react";

const Readme = ({ name }) => {
  if (!name) return null;
  const dispatch = useDispatch();
  const { readmeContent } = useSelector(githubSelector);

  useEffect(() => {
    dispatch(getReadme(name));
  }, []);

  return readmeContent ? (
    <ReactMarkdown>{readmeContent}</ReactMarkdown>
  ) : (
    <h1>No Readme Found</h1>
  );
};

export default Readme;
