import { METHOD } from './config/method'

export const CLIENT_TEST = (id) => ({
  method: METHOD.GET,
  url: `test-kit/question-to-test/${id}`
})
