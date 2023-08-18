import { FunctionComponent, useState } from "react";
import { ItemType } from "../../types/Items";
import { UserType } from "../../types/Users";
import styles from "./Table.module.scss";
type TableRowType = {
  itemId: number;
};
const HackerTableRow: FunctionComponent<TableRowType> = ({ itemId }) => {
  const [item, setItem] = useState<ItemType>();
  const [user, setUser] = useState<UserType>();
  return (
    <tr className={styles.row}>
      <td className={styles.dataCell}>{itemId}</td>
    </tr>
  );
};

export default HackerTableRow;
