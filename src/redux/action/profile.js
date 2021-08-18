export const actionTypesProfile = {
  REQUEST_PROFILE_DATA: "REQUEST_COURSE_DATA",
  SET_PROFILE_SAGA: "SET_PROFILE_SAGA",
};

export const requestProfileSaga = () => ({
  type: actionTypesProfile.REQUEST_PROFILE_DATA,
});

export const setProfileSaga = (data) => ({
  type: actionTypesProfile.SET_PROFILE_SAGA,
  data,
});
