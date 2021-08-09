import { METHOD } from "./config/method";

export const REGISTER_CLIENT = () => ({
  method: METHOD.POST,
  url: "/api/v1/clients/register",
});

export const ACTIVE_CLIENT = () => ({
  method: METHOD.POST,
  url: "/api/v1/clients/active",
});
