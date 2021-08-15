import { METHOD } from "./config/method";

export const LIST_CLIENT_TEST = () => ({
  method: METHOD.GET,
  url: "/api/v1/client-tests/",
});

export const LIST_CLIENT_TEST_BY_ADMIN = () => ({
  method: METHOD.GET,
  url: "/api/v1/client-tests/by-admin",
})
