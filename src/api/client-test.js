import { METHOD } from "./config/method";

export const CLIENT_TEST = (id) => ({
  method: METHOD.GET,
  url: `test-kit/question-to-test/${id}`,
});

export const TEST_LIST = () => ({
  method: METHOD.GET,
  url: `/tests/admin`,
});
