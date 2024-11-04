import Button from "../../components/Button";
import SplineScene from "../../components/SplineScene";
import homeStyles from "./index.module.css";

const Home = () => {
  return (
    <div>
      <header></header>
      <section className={homeStyles.hero}>
        <SplineScene />
      </section>
      <footer>
        <Button />
      </footer>
    </div>
  );
};

export default Home;
