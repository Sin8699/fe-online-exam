import { all, takeLatest, put, call } from 'redux-saga/effects';
import { actionTypesSubject, setSubjectSaga } from '../action/subject';
import axiosInstance from '../../api/config';

const getSubject = async () => {
  try {
    const response = await axiosInstance.get('/api/v1/subjects/');
    return response;
  } catch (error) {
    console.error(error);
    return {};
  }
};

function* requestSubjectSaga() {
  try {
    const response = yield call(getSubject);
    yield put(setSubjectSaga(response?.data?.data));
  } catch (error) {
    console.log(error);
  }
}

function* watchRequestDataDashboard() {
  yield takeLatest(actionTypesSubject.REQUEST_SUBJECT_DATA, requestSubjectSaga);
}

export function* subjectSaga() {
  yield all([watchRequestDataDashboard()]);
}
