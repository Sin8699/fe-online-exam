import { all } from "redux-saga/effects";
import { courseSaga } from "./course";
import { subjectSaga } from "./subject";
import { profileSaga } from "./profile";

function* rootSaga() {
  yield all([courseSaga(), subjectSaga(), profileSaga()]);
}

export default rootSaga;
