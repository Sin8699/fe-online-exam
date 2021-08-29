import { METHOD } from './config/method'

export const GET_QUESTIONS_BY_TEST_KIT = (id) => ({
  method: METHOD.GET,
  url: `questions/${id}`,
})
