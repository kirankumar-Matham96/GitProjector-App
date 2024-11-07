import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useSelector, useDispatch } from "react-redux";
import { authSelector, signup } from "../../redux/authSlice";
import Card from "../../components/Card";
import styles from "./index.module.scss";

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
    <div className={styles.bg_signup}>
      <Card>
        <form onSubmit={handleSubmit}>
          <h2>SIGN UP</h2>
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
            placeholder="Confirm password"
          />
          <Button type="submit">
            {(auth.isLoading && "Loading...") || "Sign Up"}
          </Button>
          <p className="helper-link">
            <Link to="/signin">Have an account already?</Link>
          </p>
        </form>
      </Card>
    </div>
  );
};

export default Signup;
