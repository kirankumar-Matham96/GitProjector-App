import { useEffect, useRef } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useSelector, useDispatch } from "react-redux";
import { authSelector, signup } from "../../redux/authSlice";

const Signup = () => {
  const auth = useSelector(authSelector);
  const dispatch = useDispatch();
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.current.value !== confirmPassword.current.value) {
      return;
    }

    const userData = {
      name: name.current.value,
      email: email.current.value,
      password: password.current.value,
    };

    dispatch(signup(userData));
  };

  useEffect(() => {
    if (!auth.isLoading) {
      name.current.value = "";
      email.current.value = "";
      password.current.value = "";
      confirmPassword.current.value = "";
    }
  }, [auth.isLoading]);

  return (
    <form onSubmit={handleSubmit}>
      <Input
        ref={name}
        label="Name: "
        type="text"
        name="name"
        id="signupName"
        placeholder="Enter your name"
      />

      <Input
        ref={email}
        label="Email: "
        type="email"
        name="email"
        id="signupEmail"
        placeholder="Enter your email"
      />

      <Input
        ref={password}
        label="Password: "
        type="password"
        name="password"
        id="signupPassword"
        placeholder="Enter your password"
      />
      <Input
        ref={confirmPassword}
        label="Confirm Password: "
        type="password"
        name="password"
        id="signupConfirmPassword"
        placeholder="Enter your password"
      />
      <Button type="submit">
        {(auth.isLoading && "Loading...") || "Sign Up"}
      </Button>
    </form>
  );
};

export default Signup;
