import { FunctionComponent, useEffect, useState } from "react";
import { ItemType } from "../../types/Items";
import { apiGetStoryItem } from "../../util/Network";
import GhostRow from "../GhostTable/GhostRow";
import HackerTableRow from "./HackerTableRow";
import styles from "../../styles/Table.module.scss";

type PropsType = {
  itemIds: number[];
};
const HackerTable: FunctionComponent<PropsType> = ({ itemIds }) => {
  const [items, setItems] = useState<ItemType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const refreshItems = (): Promise<void> => {
    let list: ItemType[] = [];
    if (itemIds) {
      setLoading(true);
      const apiPromises = itemIds.map((id) =>
        apiGetStoryItem(id)
          .then((res) => list.push(res))
          .catch((err) => {
            console.log("Error fetching: ", err);
          })
      );
      return Promise.all(apiPromises)
        .then(() => {
          list.sort((a, b) => (a.score || 0) - (b.score || 0)); //TODO if time, let sort change to descending
          setItems(list);
          setLoading(false);
        })
        .catch((err) => {
          console.log("Error fetching: ", err);
        });
    }

    return Promise.resolve();
  };

  useEffect(() => {
    itemIds && refreshItems();
  }, [itemIds]);

  console.log(items);
  return (
    <table className={styles.infoTable}>
      <thead>
        <tr>
          <th className={styles.headerCell}>
            <button
              className={styles.refreshButton}
              onClick={() => refreshItems()}
            >
              New stories
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {itemIds ? (
          loading || !items ? (
            itemIds.map((id) => {
              return <GhostRow />;
            })
          ) : items && items.length > 0 ? (
            items.map((item) => {
              return <HackerTableRow key={item.id} item={item} />;
            })
          ) : (
            <p>No items to display</p>
          )
        ) : (
          <></>
        )}
      </tbody>
    </table>
  );
};

export default HackerTable;
