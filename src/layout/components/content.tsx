import styles from "../styles.module.css";
import { Outlet } from "react-router-dom";

const Content = () => {
  return (
    <main className={styles.content}>
      <header className={styles.header}></header>
      <section>
        <Outlet />
      </section>
    </main>
  );
};

export default Content;
