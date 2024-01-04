import styles from "./App.module.css";
function Button({ char }) {
  return <span className={styles.buttonItem}>{char}</span>;
}

export default Button;
