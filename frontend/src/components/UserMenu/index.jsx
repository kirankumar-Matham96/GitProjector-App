import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import { authSelector } from "../../redux/authSlice.js";
import styles from "./index.module.scss";
import { useSelector } from "react-redux";

const UserMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();
  const { userName } = useSelector(authSelector);

  const toggleMenu = () => {
    setShowMenu((prevState) => !prevState);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef?.current && !menuRef?.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className={styles.userMenu} ref={menuRef}>
      <div onClick={toggleMenu}>
        <FaRegCircleUser />
      </div>
      <ul className={`${showMenu ? "show" : ""}`}>
        {/* show username */}
        <h6>{userName || "Anonymous"}</h6>
        <li onClick={toggleMenu}>
          <Link to="/signup">Sign Up</Link>
        </li>
        <li onClick={toggleMenu}>
          <Link to="/signin">Sign In</Link>
        </li>
        <li onClick={toggleMenu}>
          <Link to="/profile">Profile</Link>
        </li>
        <li onClick={toggleMenu}>
          <Link to="/signout">Sign Out</Link>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
