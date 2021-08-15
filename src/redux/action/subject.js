export const actionTypesSubject = {
  REQUEST_SUBJECT_DATA: 'REQUEST_SUBJECT_DATA',
  SET_SUBJECT_SAGA: 'SET_SUBJECT_SAGA',
};

export const requestSubjectSaga = () => ({
  type: actionTypesSubject.REQUEST_SUBJECT_DATA,
});

export const setSubjectSaga = (data) => ({
  type: actionTypesSubject.SET_SUBJECT_SAGA,
  data,
});
