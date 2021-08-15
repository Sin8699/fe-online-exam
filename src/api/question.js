import { METHOD } from './config/method';

export const QUESTION_LIST = () => ({
  method: METHOD.GET,
  url: '/api/v1/questions/',
});
