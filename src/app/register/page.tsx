import styles from "./page.module.css";
import Signup from "@/app/forms/signup.tsx";


export default function Register() {

  return (
    // <main className={styles.main}>
      <div className={styles.container}>
        <h1>Sign Up</h1>
        <h4>Please register your credentials.</h4>
        <Signup/>
       
      </div>
  
  );
}
