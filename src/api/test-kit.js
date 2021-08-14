import { METHOD } from './config/method';

export const TEST_KIT_LIST = () => ({
  method: METHOD.GET,
  url: '/api/v1/test-kits',
});

export const CREATE_TEST_KIT = (body) => ({
  method: METHOD.POST,
  url: '/api/v1/test-kits',
  body: body,
});

export const UPDATE_TEST_KIT = (id, body) => ({
  method: METHOD.PUT,
  url: `/api/v1/test-kits/${id}`,
  body: body,
});
