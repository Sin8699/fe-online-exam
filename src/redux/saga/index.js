import { all } from 'redux-saga/effects';
import { courseSaga } from './course';
import { subjectSaga } from './subject';

function* rootSaga() {
  yield all([courseSaga(), subjectSaga()]);
}

export default rootSaga;
