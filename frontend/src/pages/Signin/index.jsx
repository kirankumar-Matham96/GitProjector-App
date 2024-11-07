import { useRef } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useSelector, useDispatch } from "react-redux";
import { authSelector, signin } from "../../redux/authSlice";
import Card from "../../components/Card";
import styles from "./index.module.scss";

const Signin = () => {
  const email = useRef();
  const password = useRef();

  const auth = useSelector(authSelector);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: email.current.value,
      password: password.current.value,
    };

    dispatch(signin(userData));
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <Input
          ref={email}
          label="Email: "
          type="email"
          name="email"
          id="signinEmail"
          placeholder="Enter your email"
        />
        <Input
          ref={password}
          label="Password: "
          type="password"
          name="password"
          id="signinPassword"
          placeholder="Enter your password"
        />
        <Button type="submit">Sign In</Button>
      </form>
    </Card>
  );
};

export default Signin;
