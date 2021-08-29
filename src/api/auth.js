import { METHOD } from './config/method'

export const LOGIN = (body) => ({
  method: METHOD.POST,
  url: 'auth/login',
  body: body,
})

export const RESET_PASSWORD = (body) => ({
  method: METHOD.POST,
  url: 'auth/reset-password',
  body: body,
})

export const CHANGE_PASSWORD = (body) => ({
  method: METHOD.POST,
  url: 'auth/change-password',
  body: body,
})

export const REGISTER_USER = (body) => ({
  method: METHOD.POST,
  url: 'auth/register',
  body: body,
})

export const GET_INFO_PROFILE_USER = () => ({
  method: METHOD.GET,
  url: 'auth/',
})

export const UPDATE_INFO_PROFILE_USER = (body) => ({
  method: METHOD.PATCH,
  url: 'auth/',
  body: body,
})
