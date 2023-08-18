import { useEffect, useState } from "react";
import HackerTable from "../../components/Table/HackerTable";
import { ItemType } from "../../types/Items";
import { apiGetTopStories } from "../../util/Network";
import styles from "./Home.module.scss";

const HomePage = () => {
  const [items, setItems] = useState<number[]>([]);

  //Requirement for the news to be random 10 stories
  const shuffleTen = (array: number[]) => {
    return array.sort(() => Math.random() - 0.5).slice(0, 10);
  };

  useEffect(() => {
    apiGetTopStories().then((res) => {
      var shuffled = shuffleTen(res);
      // console.log(shuffled);
      setItems(shuffled);
    });
  }, []);
  return (
    <div className={styles.homepage}>
      <div className={styles["background-image"]}>
        <a
          className={styles["attribution-caption"]}
          href="http://www.freepik.com"
        >
          Designed by Kotkoa / Freepik
        </a>
      </div>
      <div className={styles["homepage-content"]}>
        <HackerTable itemIds={items}></HackerTable>
      </div>
    </div>
  );
};

export default HomePage;
