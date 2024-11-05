import { FaGithubAlt } from "react-icons/fa";
// import Button from "../Button";
import { AiOutlineHome, AiOutlineSearch, AiOutlineBulb } from "react-icons/ai";
import { FaRegCircleUser } from "react-icons/fa6";

import styles from "./index.module.scss";

const Navbar = () => {
  return (
    <nav>
      <div className={styles.navTop}>
        <div className={styles.navLeft}>
          <div className={styles.navBrand + " " + styles.logo}>
            <FaGithubAlt />
          </div>
        </div>
        <div className={styles.navRight}>
          {/* here needs a conditional rendering for login and anonymouse user */}
          <FaRegCircleUser />
          {/* <img src="" alt="user" /> */}
        </div>
      </div>
      <div className={styles.navBottom}>
        <ul className={styles.navMenu}>
          <li className={styles.navLink}>
            <AiOutlineHome />
            <span>Home</span>
          </li>
          <li className={styles.navLink}>
            <AiOutlineSearch />
            <span className={styles.searchSpan}>Search</span>
          </li>
          <li className={styles.navLink}>
            <AiOutlineBulb />
            <span>How to use</span>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
