import { METHOD } from './config/method';

export const SUBJECT_LIST = () => ({
  method: METHOD.GET,
  url: '/api/v1/subjects/',
});

export const CREATE_SUBJECT = (body) => ({
  method: METHOD.POST,
  url: '/api/v1/subjects/',
  body: body,
});

export const UPDATE_SUBJECT = (id, body) => ({
  method: METHOD.PUT,
  url: `/api/v1/subjects/${id}`,
  body: body,
});

export const DELETE_SUBJECT = (id) => ({
  method: METHOD.DELETE,
  url: `/api/v1/subjects/${id}`,
});
