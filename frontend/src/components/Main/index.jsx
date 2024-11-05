import SplineRoboHead from "../SplineRoboHead";
import styles from "./index.module.scss";

const Main = () => {
  return (
    <main>
      <section className={styles.hero}>
        <SplineRoboHead />
        <div className={styles.heroOverlay}>
          <h1 className={styles.h1}>Git Projector</h1>
          <h3 className={styles.subH}>
          Uncover stats, trends, and insights from your code.
          </h3>
        </div>
      </section>
      <section className={styles.hero}></section>
    </main>
  );
};

export default Main;
