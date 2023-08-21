import { FunctionComponent, useEffect, useState } from "react";
import { ItemType } from "../../types/Items";
import { apiGetStoryItem } from "../../util/Network";
import GhostRow from "../GhostTable/GhostRow";
import HackerTableRow from "./HackerTableRow";
import styles from "../../styles/Table.module.scss";

type PropsType = {
  itemIds: number[];
  refresh: () => Promise<void>;
};
const HackerTable: FunctionComponent<PropsType> = ({ itemIds, refresh }) => {
  const [items, setItems] = useState<ItemType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  //Gets item data from API based on IDs and sorts them by score in ascending order
  const refreshItems = (): Promise<void> => {
    let list: ItemType[] = [];
    if (itemIds) {
      setLoading(true);
      // Returns an array of promises
      const apiPromises = itemIds.map((id) =>
        apiGetStoryItem(id)
          .then((res) => list.push(res))
          .catch((err) => {
            console.log("Error fetching: ", err);
          })
      );
      // Waits for all promises to resolve before sorting and setting the state
      return Promise.all(apiPromises)
        .then(() => {
          //TODO if time, let sort change to descending. Would be easiest to split the function in two and pass a boolean
          list.sort((a, b) => (a.score || 0) - (b.score || 0));
          setItems(list);
          setLoading(false);
        })
        .catch((err) => {
          console.log("Error fetching: ", err);
        });
    }

    return Promise.resolve();
  };
  //Refreshes the items when the itemIds change on reload or when called from the refresh button
  useEffect(() => {
    itemIds && refreshItems();
  }, [itemIds]);

  console.log(items);
  return (
    <table className={styles.infoTable}>
      <thead>
        <tr>
          <th className={styles.headerCell}>
            <button className={styles.refreshButton} onClick={() => refresh()}>
              New stories
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {/* Handles conditional rendering of data or ghost rows */}
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
