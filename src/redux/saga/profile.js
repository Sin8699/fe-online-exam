import { all, takeLatest, put, call } from "redux-saga/effects";
import { actionTypesProfile, setProfileSaga } from "../action/profile";
import axiosInstance from "../../api/config";
import {
  GET_INFO_PROFILE_CLIENT,
  GET_INFO_PROFILE_MANAGER,
} from "../../api/auth";
import checkRole from "../../helpers/checkRole";

const getProfile = async () => {
  try {
    const { isClient } = checkRole();
    const endpoint = isClient
      ? GET_INFO_PROFILE_CLIENT().url
      : GET_INFO_PROFILE_MANAGER().url;

    const response = await axiosInstance.get(endpoint);

    return response;
  } catch (error) {
    console.error(error);
    return {};
  }
};

function* requestProfileSaga() {
  try {
    const response = yield call(getProfile);
    yield put(setProfileSaga(response?.data?.data));
  } catch (error) {
    console.log(error);
  }
}

function* watchRequestDataDashboard() {
  yield takeLatest(actionTypesProfile.REQUEST_PROFILE_DATA, requestProfileSaga);
}

export function* profileSaga() {
  yield all([watchRequestDataDashboard()]);
}
