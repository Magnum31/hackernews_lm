import { useEffect, useState } from "react";
import HackerTable from "../components/Table/HackerTable";
import { ItemType } from "../types/Items";
import { apiGetTopStories } from "../util/Network";

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
    <header className="App-Header">
      <HackerTable itemIds={items}></HackerTable>
    </header>
  );
};

export default HomePage;
