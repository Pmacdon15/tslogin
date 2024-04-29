//import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.left}>
          <h1>Login</h1>
        </div>
        <div className={styles.right}>
          <h1>New to the site?</h1>
        </div>
      </div>
    </main>
  );
}
