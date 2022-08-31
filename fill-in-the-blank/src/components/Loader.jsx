import styles from "../styles/components/Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.main}>
      <div className={styles.loader} />
    </div>
  );
};

export default Loader;
