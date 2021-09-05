import {METHOD} from './config/method'

export const GET_QUESTIONS_BY_TEST_KIT = (idTestKit) => ({
  method: METHOD.GET,
  url: `questions/${idTestKit}`
})

export const CREATE_QUESTIONS = (body) => ({
  method: METHOD.POST,
  url: 'questions',
  body: body
})

export const UPDATE_QUESTIONS = (id, body) => ({
  method: METHOD.PUT,
  url: `questions/${id}`,
  body: body
})
