import styles from "../../styles/GhostTable.module.scss";
const GhostRow = () => {
  //Barebones row to show while loading
  return (
    <div className={styles.ghostRow}>
      <div className={styles.ghostCell}></div>
      <div className={styles.ghostCell}></div>
      <div className={styles.ghostCell}></div>
      <div className={styles.ghostCell}></div>
      <div className={styles.ghostImage}></div>
    </div>
  );
};

export default GhostRow;
