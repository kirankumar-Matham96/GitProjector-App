import { useRef } from "react";
import Button from "../Button";
import Input from "../Input";
import { useDispatch, useSelector } from "react-redux";
import { githubLogin, githubSelector } from "../../redux/githubSlice";
import { authSelector } from "../../redux/authSlice";
import styles from "./index.module.scss";

const GithubAuth = () => {
  const token = useRef();
  const { token: authToken } = useSelector(authSelector);
  // const git = useSelector(githubSelector);
  const dispatch = useDispatch();

  const handleOnClick = () => {
    dispatch(
      githubLogin({
        gitToken: token.current.value,
        authToken: `Bearer ${authToken}`,
      })
    );
  };

  return (
    <div className={styles.gitAuthComponent}>
      <div>
        <Input
          ref={token}
          type="password"
          id="token"
          name="token"
          placeholder="Github Access Token"
        />
        <Button onClick={handleOnClick}>Authorize</Button>
      </div>
      <p className="read-the-docs">
        NOTE: Provide a github access-key or token to authorize this app to read
        your github account. Give read access to your token before submitting.
        You can follow this{" "}
        <span className="helper-link">
          <a
            target="_blank"
            href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens"
          >
            link
          </a>
        </span>{" "}
        to know more about the tokens. Follow this{" "}
        <span className="helper-link">
          <a
            target="_blank"
            href="../../../public/GenerateGitHubPersonalAccessTokenStepByStep_PDF_2024-11-15180312.550169.pdf"
          >
            document
          </a>
        </span>{" "}
        to create your github token.
      </p>
    </div>
  );
};

export default GithubAuth;
