//User type to allow for strict typing of the user object, based on the API docs
export type UserType = {
  id: string;
  created: number;
  karma: number;
  about?: string;
  submitted?: number[];
};
