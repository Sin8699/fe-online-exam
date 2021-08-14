import { all, takeLatest, put, call } from 'redux-saga/effects';
import { actionTypesCourse, setCourseSaga } from '../action/course';
import axiosInstance from '../../api/config';

const getCourse = async () => {
  try {
    const response = await axiosInstance.get('/api/v1/courses/');
    return response;
  } catch (error) {
    console.error(error);
    return {};
  }
};

function* requestCourseSaga() {
  try {
    const response = yield call(getCourse);
    yield put(setCourseSaga(response?.data?.data));
  } catch (error) {
    console.log(error);
  }
}

function* watchRequestDataDashboard() {
  yield takeLatest(actionTypesCourse.REQUEST_COURSE_DATA, requestCourseSaga);
}

export function* courseSaga() {
  yield all([watchRequestDataDashboard()]);
}
