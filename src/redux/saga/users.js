import { all, takeLatest, put, call } from "redux-saga/effects";
import { actionTypesUsers, setUsersSaga } from "../action/users";
import axiosInstance from "../../api/config";
import { GET_ALL_USERS } from "../../api/users";

const getUsers = async () => {
  try {
    const endpoint = GET_ALL_USERS().url;
    const response = await axiosInstance.get(endpoint);
    return response;
  } catch (error) {
    console.error(error);
    return {};
  }
};

function* requestUsersSaga() {
  try {
    const response = yield call(getUsers);
    yield put(setUsersSaga(response?.data || []));
  } catch (error) {
    console.log(error);
  }
}

function* watchRequestDataDashboard() {
  yield takeLatest(actionTypesUsers.REQUEST_USERS_DATA, requestUsersSaga);
}

export function* usersSaga() {
  yield all([watchRequestDataDashboard()]);
}
