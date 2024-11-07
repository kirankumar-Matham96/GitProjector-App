import { FaGithubAlt } from "react-icons/fa";
import { AiOutlineHome, AiOutlineSearch, AiOutlineBulb } from "react-icons/ai";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import styles from "./index.module.scss";

const Navbar = () => {
  return (
    <nav>
      <div className={styles.navTop}>
        <div className={styles.navLeft}>
          <div className={styles.navBrand + " " + styles.logo}>
            <Link to="/">
            <FaGithubAlt />
            </Link>
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
            <Link to="/">
              <AiOutlineHome />
              <span>Home</span>
            </Link>
          </li>
          <li className={styles.navLink}>
            <Link to="/search">
              <AiOutlineSearch />
              <span className={styles.searchSpan}>Search</span>
            </Link>
          </li>
          <li className={styles.navLink}>
            <Link to="how_it_works">
              <AiOutlineBulb />
              <span>How it works</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
