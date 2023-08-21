//Item type to allow for strict typing of the item object, based on the API docs
export type ItemType = {
  id: number;
  deleted?: boolean;
  itemType?: "story" | "comment" | "poll" | "pollopt";
  by?: string;
  time?: number;
  text?: string;
  dead?: boolean;
  parent?: number;
  poll?: number;
  kids?: number[];
  url?: string;
  score?: number;
  title?: string;
  parts?: number[];
  descendants?: number;
};
