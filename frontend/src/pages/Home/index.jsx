import Header from "../../components/Header";
import Main from "../../components/Main";
import Footer from "../../components/Footer";
import styles from "./index.module.scss";

const Home = () => {
  return (
    <div className={styles.home}>
      <Main />
    </div>
  );
};

export default Home;
