import { METHOD } from "./config/method";

export const GET_ALL_USERS = () => ({
  method: METHOD.GET,
  url: "auth/admin/all",
});

export const UPDATE_USER = (id) => ({
  method: METHOD.PATCH,
  url: `/auth/admin/${id}`,
});
