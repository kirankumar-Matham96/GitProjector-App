import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "github-markdown-css";
import {
  githubSelector,
  getContents,
  clearContents,
} from "../../redux/githubSlice";
import { useState } from "react";
import Button from "../Button";
import { CodeBlock, dracula } from "react-code-blocks";

const Content = ({ name }) => {
  const [fileLanguage, setFileLanguage] = useState("javascript");
  const [extension, setExtension] = useState(".js");
  const [path, setPath] = useState([]);
  const { repoContents } = useSelector(githubSelector);
  const dispatch = useDispatch();

  const markdownExtensions = [
    // Text and Markdown
    ".txt",
    ".md",
    ".markdown",
    ".rst",
    ".adoc",

    // Documents
    ".pdf",
    ".doc",
    ".docx",
    ".xls",
    ".xlsx",
    ".ppt",
    ".pptx",
    ".odt",
    ".ods",
    ".odp",

    // Media Files
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".svg",
    ".bmp",
    ".ico",
    ".webp",
    ".tiff",
    ".mp3",
    ".wav",
    ".mp4",
    ".avi",
    ".mov",

    // Compressed Files
    ".zip",
    ".tar",
    ".gz",
    ".rar",
    ".7z",
    ".bz2",
    ".xz",

    // Binary Files
    ".bin",
    ".exe",
    ".dll",
    ".so",
    ".dylib",
    ".jar",
    ".class",

    // Fonts
    ".ttf",
    ".woff",
    ".woff2",
    ".otf",

    // Logs
    ".log",
    ".out",
    ".err",

    // Miscellaneous
    ".csv",
    ".tsv",
    ".ics",
    ".dat",
    ".bak",
    ".tmp",
    ".lock",
  ];
  const codeExtensions = [
    // Programming Languages
    ".js",
    ".jsx",
    ".ts",
    ".tsx",
    ".html",
    ".css",
    ".scss",
    ".sass",
    ".json",
    ".xml",
    ".yaml",
    ".yml",
    ".java",
    ".py",
    ".rb",
    ".php",
    ".cs",
    ".cpp",
    ".c",
    ".h",
    ".hpp",
    ".go",
    ".swift",
    ".kt",
    ".rs",
    ".pl",
    ".sh",
    ".bash",
    ".bat",
    ".ps1",
    ".lua",
    ".perl",
    ".r",
    ".m",
    ".dart",
    ".scala",
    ".groovy",
    ".asm",
    ".vhdl",

    // Configuration Files
    ".env",
    ".ini",
    ".cfg",
    ".conf",
    ".toml",

    // Scripts
    ".sql",
    ".sqlite",
    ".db",
    ".ksh",
    ".awk",
    ".cmd",

    // Data Formats
    ".csv",
    ".tsv",
    ".parquet",
    ".avro",
    ".orc",

    // Template Files
    ".ejs",
    ".pug",
    ".hbs",
    ".njk",
    ".jinja",
    ".liquid",

    // Markup Languages
    ".xml",
    ".xhtml",
    ".svg",
    ".rss",

    // Machine Learning and AI
    ".ipynb",
    ".pkl",
    ".h5",
    ".onnx",
    ".pb",
    ".tflite",

    // DevOps and Infrastructure
    ".dockerfile",
    ".yml",
    ".yaml",
    ".tf",
    ".tfvars",
    ".k8s",
    ".helm",
  ];

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
      {path.length > 0 && <Button onClick={handleBack}>Back {"<=="}</Button>}
      {Array.isArray(repoContents) && (
        <ul>
          <p>{path || "/"}</p>
          {repoContents?.map((content) => (
            <li
              key={content.sha}
              onClick={() => handleContentSelect(content.name)}
            >
              {content.name}
            </li>
          ))}
        </ul>
      )}
      {!Array.isArray(repoContents) && (
        <div>
          <h3>{name}</h3>
          <p>{path || "/"}</p>
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
