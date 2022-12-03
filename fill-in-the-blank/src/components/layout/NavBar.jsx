import { Link } from "react-router-dom";

import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth } from "../../firebase";

import logo from "../../assets/images/DBSBank.png"

import styles from "../../styles/components/layout/NavBar.module.css";
import ActionButton from "../ActionButton";

const NavBar = () => {
  const [user, loading, error] = useAuthState(firebaseAuth);

  const logout = () => {
    signOut(firebaseAuth)
      .then(() => {
        console.log("Signed out successfully");
      })
      .catch((error) => {
        console.log("Signed out failed: ", error);
      });
  };

  return (
    <div className={styles.navBar}>
      {/* <header className={styles.websiteTitle}>NTU WebApp</header> */}
      <Link className={styles.websiteTitle} to="/">
        <img src={logo} style = {{width:"52px",height:"52px"}}/>

        DBS Bank
      </Link>
      {user ? (
        <div className={styles.navBarLinksRow}>
          <Link className={styles.navBarLink} to="/indexSwap">
            Dashboard
          </Link>
          <Link className={styles.navBarLink} to="/forum">
            Transaction
          </Link>
          <Link className={styles.navBarLink} to="/groupFinder">
            Profile
          </Link>
        </div>
      ) : (
        <div className={styles.navBarLinksRow}></div>
      )}

      {user ? (
        <ActionButton colour="error" text="Log Out" onClick={logout}>
        </ActionButton>
      ) : (
        <></>
      )}
    </div>
  );
};

export default NavBar;
