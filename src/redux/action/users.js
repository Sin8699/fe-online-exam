export const actionTypesUsers = {
  REQUEST_USERS_DATA: "REQUEST_USERS_DATA",
  SET_USERS_SAGA: "SET_USERS_SAGA",
};

export const requestUsersSaga = () => ({
  type: actionTypesUsers.REQUEST_USERS_DATA,
});

export const setUsersSaga = (data) => ({
  type: actionTypesUsers.SET_USERS_SAGA,
  data,
});
