import { ItemType } from "../types/Items";
import { UserType } from "../types/Users";

const BASE_URL = `https://hacker-news.firebaseio.com/v0`;
//Placing all api calls in one since small and uncomplicated

//Get top stories IDs. Considered using /beststories since it does not return jobs
export const apiGetTopStories = () => {
  return fetch(`${BASE_URL}/beststories.json`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

//Get the item corresponding to the ID
export const apiGetStoryItem = (itemId: number): Promise<ItemType> => {
  return fetch(`${BASE_URL}/item/${itemId}.json`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

//Gets the user corresponding to the ID
export const apiGetUser = (userId: string): Promise<UserType> => {
  return fetch(`${BASE_URL}/user/${userId}.json`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
