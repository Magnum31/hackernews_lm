import { FunctionComponent, useEffect, useState } from "react";
import { ItemType } from "../../types/Items";
import { apiGetStoryItem } from "../../util/Network";
import HackerTableRow from "./HackerTableRow";
import styles from "./Table.module.scss";

type PropsType = {
  itemIds: number[];
};
const HackerTable: FunctionComponent<PropsType> = ({ itemIds }) => {
  const [items, setItems] = useState<ItemType[]>([]);
  //TODO Fetch the items from the IDs and sort them

  const refreshItems = (): Promise<void> => {
    let list: ItemType[] = [];
    if (itemIds) {
      const apiPromises = itemIds.map((id) =>
        apiGetStoryItem(id)
          .then((res) => list.push(res))
          .catch((err) => {
            console.log(err);
          })
      );
      return Promise.all(apiPromises)
        .then(() => {
          list.sort((a, b) => (a.score || 0) - (b.score || 0)); //TODO if time, let sort change to descending
          setItems(list);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    return Promise.resolve();
  };

  useEffect(() => {
    refreshItems();
  }, [itemIds]);

  console.log(items);
  return (
    <table className={styles.infoTable}>
      <thead>
        <tr>
          <th className={styles.headerCell}>
            <button onClick={() => refreshItems()}> New stories</button>
          </th>
          {/* <th className={styles.headerCell}>2</th> */}
        </tr>
      </thead>
      <tbody>
        {items.map((item) => {
          return <HackerTableRow key={item.id} item={item} />;
        })}
      </tbody>
    </table>
  );
};

export default HackerTable;
