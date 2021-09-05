import { METHOD } from "./config/method";

export const GET_ALL_USERS = () => ({
  method: METHOD.GET,
  url: "auth/all",
});

export const UPDATE_USER = (id) => ({
  method: METHOD.GET,
  url: `/auth/${id}/status`,
});
