import { FunctionComponent, useEffect, useState } from "react";
import { ItemType } from "../../types/Items";
import { UserType } from "../../types/Users";
import { formatter } from "../../util/Formatter";
import { apiGetUser } from "../../util/Network";
import styles from "./Table.module.scss";
type TableRowType = {
  item: ItemType;
};
const HackerTableRow: FunctionComponent<TableRowType> = ({ item }) => {
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    item.by &&
      apiGetUser(item.by).then((res) => {
        setUser(res);
      });
  }, [item]);
  return (
    <tr className={styles.row}>
      <td className={styles.verticalAlign}>
        <div className={styles.label}>{item.title}</div>
        <div className={`${styles.dataCell} ${styles.urlCell}`}>{item.url}</div>
      </td>
      <td className={styles.dataCell}>{item.time && formatter(item.time)}</td>
      <td className={styles.dataCell}>{item.score + " points"}</td>
      <td className={styles.verticalAlign}>
        <div className={styles.label}>User:</div>
        <div className={styles.dataCell}>
          {user?.id} , {user?.karma + " karma"}
        </div>
      </td>
      {/* <td className={styles.verticalAlign}>
        <div className={styles.label}>Karma:</div>
        <div className={styles.dataCell}>{user?.karma}</div>
      </td> */}
      <td className={styles.dataCell}>{"dummy image"}</td>
    </tr>
  );
};

export default HackerTableRow;
