import { ItemType } from "../types/Items";
import { UserType } from "../types/Users";

const BASE_URL = `https://hacker-news.firebaseio.com/v0`;
//Placing all api calls in one since small and uncomplicated

export const apiGetTopStories = () => {
  return fetch(`${BASE_URL}/topstories.json`, {
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

export const apiGetStoryItem = (itemId: string): Promise<ItemType> => {
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
