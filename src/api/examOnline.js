import { METHOD } from './config/method';

export const GET_LIST_QUESTION = () => ({
  method: METHOD.GET,
  url: '/api/v1/test-kits/',
});
