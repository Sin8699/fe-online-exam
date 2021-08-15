import { METHOD } from "./config/method";

export const LOGIN = (body) => ({
  method: METHOD.POST,
  url: "/api/v1/auths/login",
  body: body,
});

export const FORGOT_PASSWORD = (body) => ({
  method: METHOD.POST,
  url: "/api/v1/auths/forgot-password",
  body: body,
});

export const RESET_PASSWORD = (body) => ({
  method: METHOD.POST,
  url: "/api/v1/auths/reset-password",
  body: body,
});

export const GET_INFO_PROFILE_CLIENT = (body) => ({
  method: METHOD.GET,
  url: "/api/v1/clients/my-profile",
  body: body,
});

export const GET_INFO_PROFILE_MANAGER = (body) => ({
  method: METHOD.GET,
  url: "/api/v1/managers/my-profile"
});

export const UPDATE_INFO_PROFILE_CLIENT = (body) => ({
  method: METHOD.PUT,
  url: "/api/v1/clients/my-profile"
});

export const UPDATE_INFO_PROFILE_MANAGER = (body) => ({
  method: METHOD.PUT,
  url: "/api/v1/managers/my-profile",
  body: body,
});