import { useState } from "react";

import { firebaseAuth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

import styles from "../styles/components/Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("Signed in as: ", user);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  console.log("email:", email);
  console.log("password:", password);

  return (
    <div className={styles.loginCard}>
      <h1 className={styles.loginCardHeader}>Login with your DigiBank Account</h1>
      <div className={styles.loginArea}>
        <h2 className={styles.inputHeader}>Email</h2>
        <input
          className={styles.inputField}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <h2 className={styles.inputHeader}>Password</h2>
        <input
          className={styles.inputField}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={styles.loginButton} onClick={handleSignIn}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
