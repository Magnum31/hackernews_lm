import { FunctionComponent } from "react";
import { ItemType } from "../../types/Items";
import HackerTableRow from "./HackerTableRow";
import styles from "./Table.module.scss";

type PropsType = {
  itemIds: number[];
};
const HackerTable: FunctionComponent<PropsType> = ({ itemIds }) => {
  return (
    <table className={styles.infoTable}>
      <thead>
        <tr>
          <th className={styles.headerCell}>1</th>
          {/* <th className={styles.headerCell}>2</th> */}
        </tr>
      </thead>
      <tbody>
        {itemIds.map((itemId) => {
          return <HackerTableRow key={itemId} itemId={itemId} />;
        })}
      </tbody>
    </table>
  );
};

export default HackerTable;
