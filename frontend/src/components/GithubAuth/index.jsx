import { useRef } from "react";
import Button from "../Button";
import Input from "../Input";
import { useDispatch, useSelector } from "react-redux";
import {
  githubLogin,
  getAllRepos,
  githubSelector,
} from "../../redux/githubSlice";
import { authSelector } from "../../redux/authSlice";

const GithubAuth = () => {
  const token = useRef();
  const { token: authToken } = useSelector(authSelector);
  const git = useSelector(githubSelector);
  const dispatch = useDispatch();

  const handleOnClick = () => {
    console.log("🚀 ~ handleOnClick ~ authToken:", authToken);
    dispatch(
      githubLogin({
        gitToken: token.current.value,
        authToken: `Bearer ${authToken}`,
      })
    );
  };

  return (
    <div>
      {console.log("🚀 ~ GithubAuth ~ git.isLoading:", git.isLoading)}
      {console.log("🚀 ~ GithubAuth ~ git.isError:", git.isError)}
      {console.log("🚀 ~ GithubAuth ~ git.error:", git.error)}
      {console.log("🚀 ~ GithubAuth ~ git.userId:", git.userId)}
      <Input
        ref={token}
        type="password"
        id="token"
        name="token"
        placeholder="Github Access Token"
      />
      <Button onClick={handleOnClick}>Authorize</Button>
    </div>
  );
};

export default GithubAuth;
