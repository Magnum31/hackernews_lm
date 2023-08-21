import { useEffect, useState } from "react";
import HackerTable from "../../components/Table/HackerTable";
import { ItemType } from "../../types/Items";
import { apiGetTopStories } from "../../util/Network";
import styles from "./Home.module.scss";

const HomePage = () => {
  const [itemIds, setItemIds] = useState<number[]>([]);

  //Requirement for the news to be random 10 stories
  const shuffleTen = (array: number[]) => {
    return array.sort(() => Math.random() - 0.5).slice(0, 10);
  };
  // Fetches the top stories' IDs from the API and shuffles them
  const refreshIds = (): Promise<void> => {
    return apiGetTopStories().then((res) => {
      var shuffled = shuffleTen(res);
      // console.log(shuffled);
      setItemIds(shuffled);
    });
  };
  useEffect(() => {
    refreshIds();
  }, []);

  return (
    <div className={styles.homepage}>
      <div className={styles["background-image"]} />
      <div className={styles["homepage-title"]}>10 hurtige fra HackerNews</div>
      <div className={styles["homepage-content"]}>
        {itemIds && <HackerTable itemIds={itemIds} refresh={refreshIds} />}
      </div>
    </div>
  );
};

export default HomePage;
