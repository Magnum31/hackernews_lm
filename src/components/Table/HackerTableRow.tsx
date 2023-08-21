import { FunctionComponent, useEffect, useState } from "react";
import { ItemType } from "../../types/Items";
import { UserType } from "../../types/Users";
import { formatter } from "../../util/Formatter";
import { apiGetUser } from "../../util/Network";
import styles from "../../styles/Table.module.scss";
import ghostStyles from "../../styles/GhostTable.module.scss";

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
        <div className={`${styles.dataCell} ${styles.urlCell}`}>
          <a href={item.url} target="_blank">
            {item.url}
          </a>
        </div>
      </td>
      <td className={styles.dataCell}>{item.time && formatter(item.time)}</td>
      <td className={styles.dataCell}>{item.score + " points"}</td>
      <td className={styles.verticalAlign}>
        <div className={styles.label}>User:</div>
        <div className={user ? styles.dataCell : ghostStyles.ghostCell}>
          {user ? user?.id + " , " + user?.karma + " karma" : ""}
        </div>
      </td>
      <td className={styles.dataCell}>
        <div className={`${styles.imageCell} ${styles.responsiveImage}`}>
          {/*Didn't want to use a static asset, this is more fun */}
          <img
            className={styles.responsiveImage}
            src={"https://picsum.photos/200/100"}
            alt="Relevant image"
          />
        </div>
      </td>
    </tr>
  );
};

export default HackerTableRow;
