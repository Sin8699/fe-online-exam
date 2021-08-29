import { all, takeLatest, put, call } from 'redux-saga/effects'
import { actionTypesProfile, setProfileSaga } from '../action/profile'
import axiosInstance from '../../api/config'
import { GET_INFO_PROFILE_USER } from '../../api/auth'

const getProfile = async () => {
  try {
    const endpoint = GET_INFO_PROFILE_USER().url
    const response = await axiosInstance.get(endpoint)
    return response
  } catch (error) {
    console.error(error)
    return {}
  }
}

function* requestProfileSaga() {
  try {
    const response = yield call(getProfile)
    yield put(setProfileSaga(response?.data || []))
  } catch (error) {
    console.log(error)
  }
}

function* watchRequestDataDashboard() {
  yield takeLatest(actionTypesProfile.REQUEST_PROFILE_DATA, requestProfileSaga)
}

export function* profileSaga() {
  yield all([watchRequestDataDashboard()])
}
