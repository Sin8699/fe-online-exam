import { METHOD } from "./config/method";

export const FORM_CONTACT_LIST = () => ({
  method: METHOD.GET,
  url: "/api/v1/form-contacts/",
});
