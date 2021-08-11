import { METHOD } from './config/method';

export const COURSE_LIST = () => ({
  method: METHOD.GET,
  url: '/api/v1/courses/',
});

export const CREATE_COURSE = (body) => ({
  method: METHOD.POST,
  url: '/api/v1/courses/',
  body: body,
});

export const UPDATE_COURSE = (id, body) => ({
  method: METHOD.PUT,
  url: `/api/v1/courses/${id}`,
  body: body,
});

export const DELETE_COURSE = (id) => ({
  method: METHOD.DELETE,
  url: `/api/v1/courses/${id}`,
});
