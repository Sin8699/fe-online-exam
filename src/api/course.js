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

export const UPDATE_COURSE = (body) => ({
  method: METHOD.PUT,
  url: `/api/v1/courses/${body?.id}`,
  body: body,
});

export const DELETE_COURSE = (body) => ({
  method: METHOD.DELETE,
  url: `/api/v1/courses/${body?.id}`,
});
