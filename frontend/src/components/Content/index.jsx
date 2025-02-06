import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "github-markdown-css";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaRegFileLines, FaFolder } from "react-icons/fa6";
import {
  githubSelector,
  getContents,
  clearContents,
} from "../../redux/githubSlice";
import { useState } from "react";
import Button from "../Button";
import { CodeBlock, dracula } from "react-code-blocks";
import styles from "./index.module.scss";

const Content = ({ name }) => {
  const [fileLanguage, setFileLanguage] = useState("javascript");
  const [extension, setExtension] = useState(".js");
  const [path, setPath] = useState([]);
  const { repoContents } = useSelector(githubSelector);
  const dispatch = useDispatch();

  const getLanguageByExtension = (extension) => {
    switch (extension) {
      // Web Languages
      case ".html":
        return "html";
      case ".css":
        return "css";
      case ".sass":
        return "sass";
      case ".scss":
        return "sass";
      case ".js":
        return "javascript";
      case ".jsx":
        return "jsx";
      case ".ts":
        return "typescript";
      case ".tsx":
        return "tsx";

      // Backend Languages
      case ".java":
        return "java";
      case ".py":
        return "python";
      case ".rb":
        return "ruby";
      case ".php":
        return "php";
      case ".cs":
        return "csharp";
      case ".cpp":
        return "cpp";
      case ".c":
        return "c";
      case ".go":
        return "go";
      case ".rs":
        return "rust";
      case ".kt":
        return "kotlin";
      case ".swift":
        return "swift";

      // Scripting Languages
      case ".sh":
        return "bash";
      case ".bash":
        return "bash";
      case ".txt":
        return "text";

      // Unknown
      default:
        return "javascript";
    }
  };

  useEffect(() => {
    dispatch(
      getContents({
        repoName: name,
        path: path.length > 0 ? path.join("") : "",
      })
    );

    return () => {
      dispatch(clearContents());
    };
  }, [dispatch, name, path]);

  useEffect(() => {
    if (repoContents?.name) {
      setExtension("." + repoContents.name.split(".").pop());
    }
  }, [repoContents]);

  useEffect(() => {
    setFileLanguage(getLanguageByExtension(extension));
  }, [extension]);

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
      {path.length > 0 && (
        <Button className={styles.backBtn} onClick={handleBack}>
          <IoMdArrowRoundBack />
        </Button>
      )}
      {Array.isArray(repoContents) && (
        <ul>
          {console.log("🚀 ~ Content ~ path:", path)}
          <p className={styles.filePath}>
            {path.length > 0 ? `/${path}` : "/"}
          </p>
          {repoContents?.map((content) => (
            <li
              key={content.sha}
              className={styles.contentName}
              onClick={() => handleContentSelect(content.name)}
            >
              {content.type === "file" ? (
                <FaRegFileLines className={styles.fileAndFolderIcons} />
              ) : (
                <FaFolder className={styles.fileAndFolderIcons} />
              )}
              &nbsp;{content.name}
            </li>
          ))}
        </ul>
      )}
      {!Array.isArray(repoContents) && (
        <div>
          <p className={styles.filePath}>
            {path.length > 0 ? `/${path}` : "/"}
          </p>
          <h3>{name}</h3>
          <CodeBlock
            text={repoContents.content}
            language={fileLanguage}
            showLineNumbers="true"
            theme={dracula}
          />
        </div>
      )}
    </div>
  );
};

export default Content;
