import { useRef } from "react";
import Button from "../Button";
import Input from "../Input";
import { useDispatch } from "react-redux";

const GithubAuth = () => {
  const token = useRef();
const dispatch = useDispatch();

  //   const handleOnSubmit = () => {
  const handleOnChange = () => {
    dispatch();
    token.current.vaue;
  };

  return (
    // <div onSubmit={handleOnSubmit}>
    <div>
      <Input
        ref={token}
        onChange={handleOnChange}
        type="password"
        id="token"
        name="token"
        placeholder="Giyhub Access Token"
      />
      <Button>Authorize</Button>
    </div>
  );
};

export default GithubAuth;
