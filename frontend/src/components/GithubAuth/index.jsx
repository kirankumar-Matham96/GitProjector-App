import { useRef } from "react";
import Button from "../Button";
import Input from "../Input";
import { useDispatch, useSelector } from "react-redux";
import { githubLogin, githubSelector } from "../../redux/githubSlice";
import { authSelector } from "../../redux/authSlice";

const GithubAuth = () => {
  const token = useRef();
  const { token: authToken } = useSelector(authSelector);
  const git = useSelector(githubSelector);
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
  );
};

export default GithubAuth;
