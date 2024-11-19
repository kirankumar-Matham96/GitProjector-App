import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useSelector, useDispatch } from "react-redux";
import { authSelector, signin } from "../../redux/authSlice";
import Card from "../../components/Card";
import styles from "./index.module.scss";

const Signin = () => {
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();

  const auth = useSelector(authSelector);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Need to remove default after dev
    const userData = {
      email: email.current.value || "johndoe@gmail.com",
      password: password.current.value || "qawsedrf",
    };

    // dispatch(setUser(userData));
    dispatch(signin(userData));
  };

  useEffect(() => {
    if (!auth.isLoading) {
      email.current.value = "";
      password.current.value = "";
    }
    if (auth.token) {
      navigate("/search");
    }
  }, [auth.isLoading]);

  return (
    <div className={styles.bg_signin}>
      <Card>
        <form className={styles.signinForm} onSubmit={handleSubmit}>
          <h2>SIGN IN</h2>
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
          <Button type="submit">
            {auth.isLoading ? "Loading..." : "Sign In"}
          </Button>
          <p className="helper-link">
            <Link to="/signup">Don't have an account?</Link>
          </p>
        </form>
      </Card>
    </div>
  );
};

export default Signin;
