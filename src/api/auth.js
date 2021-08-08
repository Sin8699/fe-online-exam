import { METHOD } from "./config/method";

export const LOGIN = (body) => ({
  method: METHOD.POST,
  url: "/api/v1/auths/login",
  body: body,
});
