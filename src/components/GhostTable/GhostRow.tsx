import styles from "../../styles/GhostTable.module.scss";
const GhostRow = () => {
  //Barebones row to show while loading
  return (
    <tr className={styles.ghostRow}>
      <td className={styles.ghostCell}></td>
      <td className={styles.ghostCell}></td>
      <td className={styles.ghostCell}></td>
      <td className={styles.ghostCell}></td>
      <td className={styles.ghostImage}></td>
    </tr>
  );
};

export default GhostRow;
