export const actionTypesCourse = {
  REQUEST_COURSE_DATA: 'REQUEST_COURSE_DATA',
  SET_COURSE_SAGA: 'SET_COURSE_SAGA',
};

export const requestCourseSaga = () => ({
  type: actionTypesCourse.REQUEST_COURSE_DATA,
});

export const setCourseSaga = (data) => ({
  type: actionTypesCourse.SET_COURSE_SAGA,
  data,
});
