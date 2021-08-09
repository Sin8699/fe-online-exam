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
