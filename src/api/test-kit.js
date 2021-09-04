import { METHOD } from './config/method'

export const TEST_KIT_LIST = () => ({
  method: METHOD.GET,
  url: 'test-kit'
})

export const TEST_KIT_DETAIL = (id) => ({
  method: METHOD.GET,
  url: `test-kit/${id}`
})

export const TEST_KIT_DETAIL_FOR_TEST = (id) => ({
  method: METHOD.GET,
  url: `test-kit/info-to-test/${id}`
})

export const CREATE_TEST_KIT = (body) => ({
  method: METHOD.POST,
  url: 'test-kit',
  body: body
})

export const UPDATE_TEST_KIT = (id, body) => ({
  method: METHOD.PUT,
  url: `test-kit/${id}`,
  body: body
})
