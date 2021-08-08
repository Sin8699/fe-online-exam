import { METHOD } from "./config/method";

export const LIST_CLIENT_TEST = () => ({
  method: METHOD.GET,
  url: "/api/v1/client-tests/",
});
