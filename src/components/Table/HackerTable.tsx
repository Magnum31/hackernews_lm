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
  const [descending, setDescending] = useState<boolean>(false);

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
          sortItems(list);
          setLoading(false);
        })
        .catch((err) => {
          console.log("Error fetching: ", err);
        });
    }

    return Promise.resolve();
  };

  const sortItems = (items: ItemType[]) => {
    const sortedItems = [...items];
    sortedItems.sort((a, b) =>
      descending
        ? (b.score || 0) - (a.score || 0)
        : (a.score || 0) - (b.score || 0)
    );
    setItems(sortedItems);
  };
  //Refreshes the items when the itemIds change on reload or when called from the refresh button
  useEffect(() => {
    itemIds && refreshItems();
  }, [itemIds]);

  useEffect(() => {
    sortItems(items);
  }, [descending]);

  console.log(items);
  return (
    <table className={styles.infoTable}>
      <thead>
        <tr>
          <th className={styles.headerCell}>
            <button
              className={styles.refreshButton}
              onClick={() => setDescending((e) => !e)}
            >
              {descending ? "Sort by score  ▼" : "Sort by score  ▲"}
            </button>
            <button
              disabled={loading}
              className={styles.refreshButton}
              onClick={() => refresh()}
            >
              Load new stories
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {/* Handles conditional rendering of data or ghost rows */}
        {itemIds ? (
          loading || !items ? (
            itemIds.map((id, key) => {
              return <GhostRow key={key} />;
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
