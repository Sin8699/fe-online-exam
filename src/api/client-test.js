import { METHOD } from "./config/method";

export const CLIENT_TEST = (id) => ({
  method: METHOD.GET,
  url: `test-kit/question-to-test/${id}`,
});

export const SUBMIT_TEST = (body) => ({
  method: METHOD.POST,
  url: "submit-test",
});

export const GET_ALL_CLIENT_TEST = () => ({
  method: METHOD.GET,
  url: "tests",
});

export const GET_DETAIL_CLIENT_TEST = (id) => ({
  method: METHOD.GET,
  url: `tests/${id}`,
});

export const TEST_LIST = () => ({
  method: METHOD.GET,
  url: `/tests/admin`,
});
